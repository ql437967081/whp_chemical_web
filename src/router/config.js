const loginProps = [ 'managerId', 'nickname', 'signature', 'timestamp', 'username' ];

const logout = () => {
    for (let prop of loginProps) {
        sessionStorage.removeItem(prop);
        console.log(`${prop} removed from session storage.`);
    }
};

const adminNickName = '管理员';

export { loginProps, logout, adminNickName };
