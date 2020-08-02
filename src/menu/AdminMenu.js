import React from 'react';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import menuList from './config/admin';

const { SubMenu } = Menu;

class AdminMenu extends React.Component {
    // submenu keys of first level
    rootSubmenuKeys = [];
    keyPaths = {};
    titleMap = {};

    constructor(props) {
        super(props);
        const menuTreeNodes = this.renderMenu(menuList, true, []);
        this.defaultOpenKeys = this.rootSubmenuKeys.length > 0 ? [this.rootSubmenuKeys[0]] : [];
        this.state = {
            selectedKey: null,
            openKeys: this.defaultOpenKeys,
            menuTreeNodes
        };
    }

    componentDidMount() {
        this.handleMenuPath();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.handleMenuPath();
    }

    handleMenuPath = () => {
        const { pathname } = this.props.location;
        const keyPath = this.keyPaths[pathname];
        this.props.setMenuPath(keyPath ? keyPath.map(key => this.titleMap[key]) : []);
        const lastSelectedKey = this.state.selectedKey;
        if (pathname !== lastSelectedKey && (keyPath || lastSelectedKey)) {
            this.setState(keyPath
                ? { selectedKey: pathname, openKeys: keyPath.slice(0, keyPath.length - 1) }
                : { selectedKey: null, openKeys: this.defaultOpenKeys });
        }
    };

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    onSelect = x => this.setState({ selectedKey: x.selectedKeys[0] });

    renderMenu = (data, isRoot, keyPath) => {
        return data.map(item => {
            const { title, key, children } = item;
            this.titleMap[key] = title;
            if (children) {
                if (isRoot) { this.rootSubmenuKeys.push(key); }
                return (
                    <SubMenu key={key} title={title}>
                        {this.renderMenu(children, false, keyPath.concat(key))}
                    </SubMenu>
                );
            }
            this.keyPaths[key] = keyPath.concat(key);
            return (
                <Menu.Item key={key}>
                    <Link to={key}>{title}</Link>
                </Menu.Item>
            );
        })
    };

    render() {
        const { openKeys, menuTreeNodes, selectedKey } = this.state;
        return (
            <Menu
                theme={"dark"}
                mode={"inline"}
                openKeys={openKeys}
                onOpenChange={this.onOpenChange}
                selectedKeys={selectedKey ? [selectedKey] : []}
                onSelect={this.onSelect}
            >
                {menuTreeNodes}
            </Menu>
        );
    }
}

export default withRouter(AdminMenu);
