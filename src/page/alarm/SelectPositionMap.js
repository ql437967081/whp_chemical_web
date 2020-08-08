import React from 'react';
import { Button, Col, Input, message, Row, Space, Tooltip } from 'antd';
import { AimOutlined, SearchOutlined } from '@ant-design/icons';
import md5 from 'js-md5';
import ReactQMap from 'better-react-qmap';
import { qqMapKey, webServiceSecretKey, defaultCenter } from './config';
import { axios, handleFailure } from '../../http_request/default';
import { qqMapUrl } from '../../http_request/url';

let classMap, windowMap;

export default class SelectPositionMap extends React.Component {
    state = {
        searchResultText: '',
        latLngText: ','
    };

    formattedValue = () => {
        return this.state.latLngText;
    };

    triggerChange = () => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(this.formattedValue());
        }
    };

    setNameAndAddress = (name, address) => {
        this.setState({ searchResultText: name });
        this.props.setAddress(address);
    };

    geocoder = () => {
        const requestPath = '/ws/geocoder/v1';
        const { lat, lng } = this.currentCenter;
        const location = `${lat},${lng}`;
        const setNameAndAddress = this.setNameAndAddress;
        axios.get(`${qqMapUrl}${requestPath}`, {
            params: {
                key: qqMapKey,
                location,
                sig: md5(`${requestPath}?key=${qqMapKey}&location=${location}${webServiceSecretKey}`)
            }
        }).then(function (response) {
            const { address, formatted_addresses } = response.data['result'];
            setNameAndAddress(formatted_addresses['recommend'], address);
        }).catch(handleFailure);
    };

    componentDidMount() {  // 初始化为当前位置
        const _showPosition = position => {
            const { latitude, longitude } = position.coords;
            this.setState({
                center: { latitude, longitude }
            });
        };

        const _showError = error => {
            console.log(error);
            message.error('此浏览器获取定位异常，建议使用Firefox浏览器');
            this.setState({ center: defaultCenter });
        };

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(_showPosition, _showError);
        } else {
            message.error('你的浏览器不支持geolocation');
        }
    }

    _setMarker = () => {
        const { Marker, MarkerAnimation } = windowMap;
        const { lat, lng } = this.currentCenter;
        this.setState({
                latLngText: `${lng.toFixed(5)},${lat.toFixed(5)}`
            }, this.triggerChange);
        this.marker = new Marker({
            map: classMap,
            position:  this.currentCenter,
            animation: MarkerAnimation.DROP,
        });
    };

    removeMarker = () => {
        if (this.marker) {
            this.marker.setMap(null);
            this.marker = null;
        }
    };

    setMarker = () => {
        this.removeMarker();
        this._setMarker();
    };

    _initMarker = () => {  // 初始化标记
        if (!this.marker) {
            this.currentPosition = classMap.getCenter();
            this.backToCurrentPosition();
        }
    };

    _setMarkerMove = () => {
        this._initMarker();

        let timeout;

        const moveMarker = () => {
            if (this.checkSearching()) return;

            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            const center = classMap.getCenter();
            this.currentCenter = center;

            const fake = () => {
                if (center !== this.currentCenter) return;
                console.log('moveMarker');
                this.setMarker();
                this.geocoder();
            };

            timeout = setTimeout(fake, 300);
        };
        windowMap.event.addListener(classMap, 'center_changed', moveMarker);
    };

    _setSearchInput = () => {
        const { event, SearchService } = windowMap;

        const onPlaceAcquired = place => {
            const ap = new place.Autocomplete(document.getElementById('place'));

            this.keyword = '';

            this.searchService = new SearchService({
                complete: results => {
                    if (results.type === 'CITY_LIST') {
                        this.searchService.setLocation(results.detail.cities[0].cityName);
                        this.searchService.search(this.keyword);
                        return;
                    }

                    const handleSuccess = poi => {
                        const { name, address, latLng } = poi;
                        this.setNameAndAddress(name, address);
                        this.jumpToPos(latLng);
                    };

                    for (let poi of results.detail.pois) {
                        if (poi.name === this.confirmValue) {
                            handleSuccess(poi);
                            return;
                        }
                    }
                    for (let poi of results.detail.pois) {
                        if ('address' in poi && poi.address.indexOf(this.confirmValue) !== -1) {
                            handleSuccess(poi);
                            return;
                        }
                    }
                    const { searchText } = this.state;
                    if (this.keyword !== searchText) {
                        this.keyword = searchText;
                        this.searchService.search(this.keyword);
                    }
                }
            });

            const containsProvince = str => {
                return str.indexOf('省') !== -1
                    || str.indexOf('自治区') !== -1
                    || str.indexOf('特别行政区') !== -1
                    || str.indexOf('市') !== -1;
            };

            event.addListener(ap, 'confirm', res => {
                this.confirmValue = res.value;
                const { searchText } = this.state;
                this.keyword = containsProvince(searchText) ? searchText : this.confirmValue;
                this.searchService.search(this.keyword);
            });
        };

        let interval;

        const fake = () => {
            console.log('Trying to acquire place...');
            const { place } = windowMap;
            if (place) {
                console.log('Place acquired!');
                onPlaceAcquired(place);

                clearInterval(interval);
                console.log('Interval cleared.');
            }
        };

        interval = setInterval(fake, 500);
    };

    _getMapInit = (cm, wm) => {
        classMap = cm; windowMap = wm;
        this._setMarkerMove();
        this._setSearchInput();
    };

    onChange = e => this.setState({ searchText: e.target.value });

    jumpToPos = position => {
        this.currentCenter = position;
        this.setMarker();
        classMap.panTo(this.currentCenter);
        classMap.zoomTo(14);
    };

    backToCurrentPosition = () => {
        this.jumpToPos(this.currentPosition);
        this.geocoder();
    };

    checkSearching = () => {
        const { searchText } = this.state;
        return searchText && searchText.length;
    };

    render() {
        const { center, searchResultText } = this.state;
        return (
            center ? (
                <Space direction={"vertical"}>
                    <ReactQMap
                        center={center}
                        mySpot={center}
                        apiVersonSrc={`https://map.qq.com/api/js?v=2.exp&key=${qqMapKey}&libraries=place`}
                        getMap={(map, wMap) => this._getMapInit(map, wMap)}
                        style={{ width: 320, height: 320 }}
                    />
                    <Row>
                        <Col span={24}>
                            {searchResultText}
                        </Col>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            {this.formattedValue()}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={20}>
                            <Input
                                id={'place'}
                                onChange={this.onChange}
                                prefix={<SearchOutlined />}
                                allowClear
                            />
                        </Col>
                        <Col span={4} style={{ textAlign: 'right' }}>
                            <Tooltip title={'回到初始位置'}>
                                <Button
                                    shape={"circle"} icon={<AimOutlined />}
                                    onClick={this.backToCurrentPosition}
                                    disabled={this.checkSearching()}
                                />
                            </Tooltip>
                        </Col>
                    </Row>
                </Space>
            ) : null
        );
    }
}
