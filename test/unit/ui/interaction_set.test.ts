import {describe, test, expect} from '../../util/vitest';
import {InteractionSet} from '../../../src/ui/interactions';
import {Evented} from '../../../src/util/evented';

function feature(json) {
    return {
        ...json,
        clone() { return this; }
    };
}

describe('InteractionSet', () => {
    test('#add', () => {
        const map = new Evented();

        const featureset = {layerId: 'foo'};
        const layer = {id: featureset.layerId};

        // @ts-expect-error
        map.style = {
            queryRenderedFeaturesForInteractions: () => [
                feature({id: 1, featureset, layer}),
                feature({id: 2, featureset, layer})
            ]
        };

        const interactions = new InteractionSet(map);

        let clickHandled = false;

        interactions.add('test', {
            type: 'click',
            featureset,
            handler(e) {
                expect(e.interaction.type).toEqual('click');
                expect(e.feature.id).toEqual(1);
                clickHandled = true;
            }
        });

        map.fire('click');
        expect(clickHandled).toBeTruthy();
    });

    test('propagates to next feature if false returned in handler', () => {
        const map = new Evented();
        const interactions = new InteractionSet(map);

        const featureset = {layerId: 'foo'};
        const layer = {id: featureset.layerId};

        // @ts-expect-error
        map.style = {
            queryRenderedFeaturesForInteractions: () => [
                feature({id: 1, featureset, layer}),
                feature({id: 2, featureset, layer})
            ]
        };

        let clickHandled = false;

        interactions.add('test', {
            type: 'click',
            featureset,
            handler(e) {
                if (e.feature.id === 1) return false;
                expect(e.feature.id).toEqual(2);
                clickHandled = true;
            }
        });

        map.fire('click');
        expect(clickHandled).toBeTruthy();
    });

    test('#remove', () => {
        const map = new Evented();
        const interactions = new InteractionSet(map);

        // @ts-expect-error
        map.style = {
            queryRenderedFeaturesForInteractions: () => []
        };

        let clickHandled = false;

        interactions.add('test', {
            type: 'click',
            handler(e) {
                clickHandled = true;
            }
        });

        interactions.remove('test');

        map.fire('click');
        expect(clickHandled).toBeFalsy();
    });

    test('respects featureset and filter', () => {
        const map = new Evented();
        const interactions = new InteractionSet(map);

        const featureset = {layerId: 'bar'};

        // @ts-expect-error
        map.style = {
            queryRenderedFeaturesForInteractions: (_, featuresetQueryTargets) => {
                expect(featuresetQueryTargets[0].filter).toEqual(['==', ['get', 'cool'], true]);
                return [
                    feature({id: 3, featureset, properties: {cool: true}}),
                ];
            }
        };

        let clickHandled = false;

        interactions.add('test', {
            type: 'click',
            featureset,
            filter: ['==', ['get', 'cool'], true],
            handler(e) {
                expect(e.feature.id).toEqual(3);
                clickHandled = true;
            }
        });

        map.fire('click');
        expect(clickHandled).toBeTruthy();
    });
});
