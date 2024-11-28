// @flow

import {
    Uniform4f,
    Uniform3f,
    Uniform2f,
    UniformMatrix4f,
    Uniform1f,
    Uniform1i,
} from '../render/uniform_binding.js';

import type Context from '../gl/context.js';
import type {UniformValues} from '../render/uniform_binding.js';
import type {mat4} from 'gl-matrix';

export type RainUniformsType = {
    'u_modelview': UniformMatrix4f,
    'u_projection': UniformMatrix4f,
    'u_time': Uniform1f,
    'u_cam_pos': Uniform3f,
    'u_texScreen': Uniform1i,
    'u_velocityConeAperture': Uniform1f,
    'u_velocity': Uniform1f,
    'u_boxSize': Uniform1f,
    'u_rainDropletSize': Uniform2f,
    'u_distortionStrength': Uniform1f,
    'u_rainDirection': Uniform3f,
    'u_color': Uniform4f,
    'u_screenSize': Uniform2f,
    'u_thinningCenterPos': Uniform2f,
    'u_thinningShape': Uniform3f,
    'u_thinningAffectedRatio': Uniform1f,
    'u_thinningParticleOffset': Uniform1f,
    'u_shapeDirectionalPower': Uniform1f,
    'u_shapeNormalPower': Uniform1f,
    'u_mode': Uniform1f,
};

const rainUniforms = (context: Context): RainUniformsType => ({
    'u_modelview': new UniformMatrix4f(context),
    'u_projection': new UniformMatrix4f(context),
    'u_time': new Uniform1f(context),
    'u_cam_pos': new Uniform3f(context),
    'u_texScreen': new Uniform1i(context),
    'u_velocityConeAperture': new Uniform1f(context),
    'u_velocity': new Uniform1f(context),
    'u_boxSize': new Uniform1f(context),
    'u_rainDropletSize': new Uniform2f(context),
    'u_distortionStrength': new Uniform1f(context),
    'u_rainDirection': new Uniform3f(context),
    'u_color': new Uniform4f(context),
    'u_screenSize': new Uniform2f(context),
    'u_thinningCenterPos': new Uniform2f(context),
    'u_thinningShape': new Uniform3f(context),
    'u_thinningAffectedRatio': new Uniform1f(context),
    'u_thinningParticleOffset': new Uniform1f(context),
    'u_shapeDirectionalPower': new Uniform1f(context),
    'u_shapeNormalPower': new Uniform1f(context),
    'u_mode': new Uniform1f(context),
});

const rainUniformValues = (values: {
    modelview: mat4,
    projection: mat4,
    time: number,
    camPos: [number, number, number],
    velocityConeAperture: number,
    velocity: number,
    boxSize: number,
    rainDropletSize: [number, number],
    distortionStrength: number,
    rainDirection: [number, number, number],
    color: [number, number, number, number],
    screenSize: [number, number],
    thinningCenterPos: [number, number],
    thinningShape: [number, number, number],
    thinningAffectedRatio: number,
    thinningParticleOffset: number,
    shapeDirectionalPower: number,
    shapeNormalPower: number,
    mode: number,
}
): UniformValues<RainUniformsType> => ({
    'u_modelview': Float32Array.from(values.modelview),
    'u_projection': Float32Array.from(values.projection),
    'u_time': values.time,
    'u_cam_pos': values.camPos,
    'u_texScreen': 0,
    'u_velocityConeAperture': values.velocityConeAperture,
    'u_velocity': values.velocity,
    'u_boxSize': values.boxSize,
    'u_rainDropletSize': values.rainDropletSize,
    'u_distortionStrength': values.distortionStrength,
    'u_rainDirection': values.rainDirection,
    'u_color': values.color,
    'u_screenSize': values.screenSize,
    'u_thinningCenterPos': values.thinningCenterPos,
    'u_thinningShape': values.thinningShape,
    'u_thinningAffectedRatio': values.thinningAffectedRatio,
    'u_thinningParticleOffset': values.thinningParticleOffset,
    'u_shapeDirectionalPower': values.shapeDirectionalPower,
    'u_shapeNormalPower': values.shapeNormalPower,
    'u_mode': values.mode,
});

export {rainUniforms, rainUniformValues};
