const { getDefaultConfig } = require('expo/metro-config');

const ASSETS_EXTS = [
    'obj',
    'gltf',
    'bin',
    'glb',
    'mtl',
    'fbx',
    'hdr',
];

const SOURCE_EXTS = ['cjs', 'mjs'];

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push(...ASSETS_EXTS);
config.resolver.sourceExts.push(...SOURCE_EXTS);

// Remove all console logs in production...
config.transformer.minifierConfig.compress.drop_console = true;

module.exports = config;
