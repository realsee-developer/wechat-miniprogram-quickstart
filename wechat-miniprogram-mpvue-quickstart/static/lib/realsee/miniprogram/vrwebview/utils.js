// uuid
const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
/**
 * 随机生成一个uuid值
 */
const uuid = () => (S4() + S4() + '-' + S4() + '-4' + S4().substr(0, 3) + '-' + S4() + '-' + S4() + S4() + S4()).toLowerCase();

const app = getApp({ allowDefault: true });
const rsVrWebviewPropsWrapper = (object) => {
    if (!app.__RsVrWebviewPropsMap__) {
        app.__RsVrWebviewPropsMap__ = new Map();
    }
    const key = uuid();
    app.__RsVrWebviewPropsMap__.set(key, object);
    return key;
};
const getRsVrWebviewProps = (keys) => {
    const _keys = Array.isArray(keys) ? keys : [keys];
    const props = {};
    _keys.forEach((key) => {
        props[key] = app.__RsVrWebviewPropsMap__.get(key);
    });
    if (!Array.isArray(keys)) {
        return props[keys];
    }
    return props;
};
const removeRsVrWebviewProps = (keys) => {
    const _keys = Array.isArray(keys) ? keys : [keys];
    _keys.forEach((key) => {
        app.__RsVrWebviewPropsMap__.delete(key);
    });
};

export { getRsVrWebviewProps, removeRsVrWebviewProps, rsVrWebviewPropsWrapper };
//# sourceMappingURL=utils.js.map
