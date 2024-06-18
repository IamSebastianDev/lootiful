import * as THREE from "three";

// Vertex shader code
const vertexShader = /*glsl */ `
    uniform float time;
    attribute float speed;
    varying float vY;
    varying float vAlpha;

    void main() {
        vY = position.y;
        vec3 pos = position;
        pos.x += 0.1 * sin(time * 2.0 + position.y * 5.0);  // Side to side motion
        vAlpha = 0.8 + 0.4 * sin(time * 10.0 + position.y * 10.0);  // Enhanced flickering effect
        gl_PointSize = 4.0;  // Adjusted particle size
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
`;

// Fragment shader code
const fragmentShader = /*glsl */ `
    varying float vY;
    varying float vAlpha;
    uniform float fadeFactor;

    void main() {
        float alpha = (1.0 - smoothstep(-5.0, 5.0, vY * fadeFactor)) * vAlpha;
        alpha = max(alpha, 0.75);  // Ensure particles don't fade out too much
        vec3 color = vec3(0.6, 0.4, 0.4);  // Washed out ember color (muted orange-red)
        gl_FragColor = vec4(color, alpha);
    }
`;

// Shader material definition
export const emberShaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 0 },
        fadeFactor: { value: 0.5 },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
});
