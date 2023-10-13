import { MeshPhysicalMaterial, ShaderChunk } from "three";
import { displacement, headers } from "./shader";

const LOOP_DURATION = 12;
const NOISE_PERIOD_REPEAT = 3;

class MagicalMaterialImpl extends MeshPhysicalMaterial {
  private _time: { value: number };
  private _distort: { value: number };
  private _radius: { value: number };
  private _frequency: { value: number };
  private _speed: { value: number };

  private _surfaceDistort: { value: number };
  private _surfaceFrequency: { value: number };
  private _surfaceTime: { value: number };
  private _surfaceSpeed: { value: number };
  private _surfacePoleAmount: { value: number };

  private _numberOfWaves: { value: number };
  private _fixNormals: { value: boolean };
  private _gooPoleAmount: { value: number };
  private _noisePeriod: { value: number };

  constructor(parameters = {}) {
    super(parameters);
    this.setValues(parameters);

    this._time = { value: 0 };
    this._distort = { value: 0.9 };
    this._radius = { value: 1 };
    this._frequency = { value: 2 };
    this._speed = { value: 0 };

    this._surfaceDistort = { value: 0 };
    this._surfaceFrequency = { value: 0 };
    this._surfaceTime = { value: 0 };
    this._surfaceSpeed = { value: 0 };
    this._surfacePoleAmount = { value: 1 };

    this._numberOfWaves = { value: 5 };
    this._fixNormals = { value: true };
    this._gooPoleAmount = { value: 1 };
    this._noisePeriod = { value: LOOP_DURATION / NOISE_PERIOD_REPEAT };
  }

  onBeforeCompile(shader: any) {
    shader.uniforms.time = this._time;
    shader.uniforms.radius = this._radius;
    shader.uniforms.distort = this._distort;
    shader.uniforms.frequency = this._frequency;

    shader.uniforms.surfaceDistort = this._surfaceDistort;
    shader.uniforms.surfaceFrequency = this._surfaceFrequency;
    shader.uniforms.surfaceTime = this._surfaceTime;
    shader.uniforms.surfacePoleAmount = this._surfacePoleAmount;

    shader.uniforms.numberOfWaves = this._numberOfWaves;
    shader.uniforms.fixNormals = this._fixNormals;
    shader.uniforms.gooPoleAmount = this._gooPoleAmount;
    shader.uniforms.noisePeriod = this._noisePeriod;

    shader.vertexShader = `
      ${headers}
      ${shader.vertexShader}
    `;

    shader.vertexShader = shader.vertexShader.replace(
      "void main() {",
      `
        void main() {
          ${displacement}
      `
    );

    shader.vertexShader = shader.vertexShader.replace(
      "#include <displacementmap_vertex>",
      `transformed = displacedPosition;`
    );

    shader.vertexShader = shader.vertexShader.replace(
      "#include <defaultnormal_vertex>",
      ShaderChunk.defaultnormal_vertex.replace(
        "vec3 transformedNormal = objectNormal;",
        `vec3 transformedNormal = displacedNormal;`
      )
    );
  }

  get time() {
    return this._time.value;
  }

  set time(v) {
    this._time.value = v;
  }

  get distort() {
    return this._distort.value;
  }

  set distort(v) {
    this._distort.value = v;
  }

  get radius() {
    return this._radius.value;
  }

  set radius(v) {
    this._radius.value = v;
  }

  get frequency() {
    return this._frequency.value;
  }

  set frequency(v) {
    this._frequency.value = v;
  }

  get speed() {
    return this._speed.value;
  }

  set speed(v) {
    this._speed.value = v;
  }

  get surfaceDistort() {
    return this._surfaceDistort.value;
  }

  set surfaceDistort(v) {
    this._surfaceDistort.value = v;
  }

  get surfaceFrequency() {
    return this._surfaceFrequency.value;
  }

  set surfaceFrequency(v) {
    this._surfaceFrequency.value = v;
  }

  get surfaceTime() {
    return this._surfaceTime.value;
  }

  set surfaceTime(v) {
    this._surfaceTime.value = v;
  }

  get surfaceSpeed() {
    return this._surfaceSpeed.value;
  }

  set surfaceSpeed(v) {
    this._surfaceSpeed.value = v;
  }

  get numberOfWaves() {
    return this._numberOfWaves.value;
  }

  set numberOfWaves(v) {
    this._numberOfWaves.value = v;
  }

  get fixNormals() {
    return this._fixNormals.value;
  }

  set fixNormals(v) {
    this._fixNormals.value = v;
  }

  get surfacePoleAmount() {
    return this._surfacePoleAmount.value;
  }

  set surfacePoleAmount(v) {
    this._surfacePoleAmount.value = v;
  }

  get gooPoleAmount() {
    return this._gooPoleAmount.value;
  }

  set gooPoleAmount(v) {
    this._gooPoleAmount.value = v;
  }

  get noisePeriod() {
    return this._noisePeriod.value;
  }

  set noisePeriod(v) {
    this._noisePeriod.value = v;
  }
}

export default MagicalMaterialImpl;
