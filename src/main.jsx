"use strict";

require("./css/main.scss");
var frameGeometrySvg = require("./images/frame-geometry.svg");

var React = require("react");
var ReactDOM = require("react-dom");
var _ = require("underscore");
var classNames = require("classnames");
var hash = require("object-hash");

var _length = function (length, decimals) {
    return length ? length.toFixed(decimals || 0) : "n/a";
};

var _angle = function (angle, decimals) {
    return angle ? (angle * 180 / Math.PI).toFixed(decimals || 0) : "n/a";
};

var App = React.createClass({
    _self: this,

    /* eslint-disable camelcase, max-len */
    _existingAttributes: {
        old_n: {
            label: "Headtube angle",
            // validate the input in degrees
            validator: function (value) {
                var n = parseFloat(value);
                return !isNaN(n) && (n >= 30) && (n <= 100);
            },
            // convert the input in degrees to radians
            converter: function (deg) {
                return deg * Math.PI / 180;
            },
            print: function (value) {
                return _angle(value, 1);
            },
            placeholder: "72"
        },
        headtube: {
            label: "Headtube length",
            validator: function (value) {
                var n = parseFloat(value);
                return !isNaN(n) && (n >= 30) && (n <= 300);
            },
            print: function (value) {
                return _length(value);
            },
            placeholder: "116"
        },
        chainstay: {
            label: "Chainstay length",
            validator: function (value) {
                var n = parseFloat(value);
                return !isNaN(n) && (n >= 200) && (n <= 700);
            },
            print: function (value) {
                return _length(value, 0);
            },
            placeholder: "425"
        },
        old_bb: {
            label: "BB drop",
            validator: function (value) {
                var n = parseFloat(value);
                return !isNaN(n) && (n >= -50) && (n <= 130);
            },
            print: function (value) {
                return _length(value, 0);
            },
            placeholder: "66"
        },
        old_front_center: {
            label: "Front centre",
            validator: function (value) {
                var n = parseFloat(value);
                return !isNaN(n) && (n >= 200) && (n <= 800);
            },
            print: function (value) {
                return _length(value, 0);
            },
            placeholder: "599"
        },
        old_fork: {
            label: "Fork length",
            validator: function (value) {
                var n = parseFloat(value);
                return !isNaN(n) && (n >= 100);
            },
            print: function (value) {
                return _length(value, 0);
            },
            placeholder: "400"
        },
        old_rake: {
            label: "Fork rake",
            validator: function (value) {
                var n = parseFloat(value);
                return !isNaN(n);
            },
            print: function (value) {
                return _length(value, 0);
            },
            placeholder: "44"
        },
        old_wb: {
            label: "Wheelbase",
            validator: function (value) {
                var n = parseFloat(value);
                return !isNaN(n) && (n >= 300) && (n <= 2000);
            },
            print: function (value) {
                return _length(value, 0);
            },
            placeholder: "1015"
        },
        old_reach: {
            label: "Reach",
            validator: function (value) {
                var n = parseFloat(value);
                return !isNaN(n) && (n >= 100) && (n <= 1000);
            },
            print: function (value) {
                return _length(value, 0);
            },
            placeholder: "389"
        },
        old_stack: {
            label: "Stack",
            validator: function (value) {
                var n = parseFloat(value);
                return !isNaN(n) && (n >= 100) && (n <= 1000);
            },
            print: function (value) {
                return _length(value, 0);
            },
            placeholder: "555"
        },
        old_toptube: {
            label: "Toptube length (effective)",
            validator: function (value) {
                var n = parseFloat(value);
                return !isNaN(n) && (n >= 200) && (n <= 1000);
            },
            print: function (value) {
                return _length(value, 0);
            },
            placeholder: "556"
        },
        old_seattube_angle: {
            label: "Seattube angle",
            // validate the input in degrees
            validator: function (value) {
                var n = parseFloat(value);
                return !isNaN(n) && (n >= 30) && (n <= 100);
            },
            // convert the input in degrees to radians
            converter: function (deg) {
                return deg * Math.PI / 180;
            },
            print: function (value) {
                return _angle(value, 1);
            },
            placeholder: "73.5"
        },
        old_seattube: {
            label: "Seattube length",
            validator: function (value) {
                var n = parseFloat(value);
                return !isNaN(n) && (n >= 200) && (n <= 1000);
            },
            print: function (value) {
                return _length(value, 0);
            },
            placeholder: "520"
        }
    },
    _newAttributes: {
        new_fork: {
            label: "Fork length",
            validator: function (value) {
                var n = parseFloat(value);
                return !isNaN(n) && (n >= 100);
            },
            print: function (value) {
                return _length(value, 0);
            },
            placeholder: "395"
        },
        new_rake: {
            label: "Fork rake",
            validator: function (value) {
                var n = parseFloat(value);
                return !isNaN(n);
            },
            print: function (value) {
                return _length(value, 0);
            },
            placeholder: "45"
        },
        new_headset_top: {
            label: "Upper cup height",
            validator: function (value) {
                var n = parseFloat(value);
                return !isNaN(n) && (n >= 0) && (n < 40);
            },
            print: function (value) {
                return _length(value, 0);
            },
            placeholder: "16"
        },
        new_headset: {
            label: "Lower cup height",
            validator: function (value) {
                var n = parseFloat(value);
                return !isNaN(n) && (n >= 0) && (n < 40);
            },
            print: function (value) {
                return _length(value, 0);
            },
            placeholder: "12"
        }
    },
    _calculatedAttributes: {
        s_plus_headset: {
            label: "s + Lower cup",
            print: function (value) {
                return _length(value, 3);
            }
        },
        z: {
            print: function (value) {
                return _length(value, 3);
            }
        },
        t: {
            print: function (value) {
                return _length(value, 3);
            }
        },
        s: {
            print: function (value) {
                return _length(value, 3);
            }
        },
        wb_minus_z: {
            label: "Wheelbase - z",
            print: function (value) {
                return _length(value, 3);
            }
        },
        x: {
            print: function (value) {
                return _length(value, 3);
            }
        },
        m: {
            print: function (value) {
                return _angle(value, 3);
            }
        },
        a: {
            print: function (value) {
                return _angle(value, 3);
            }
        },
        o: {
            print: function (value) {
                return _angle(value, 3);
            }
        },
        v: {
            print: function (value) {
                return _length(value, 3);
            }
        },
        k: {
            print: function (value) {
                return _angle(value, 3);
            }
        },
        l: {
            print: function (value) {
                return _angle(value, 3);
            }
        },
        q: {
            print: function (value) {
                return _angle(value, 3);
            }
        },
        r: {
            print: function (value) {
                return _angle(value, 3);
            }
        },
        g: {
            print: function (value) {
                return _length(value, 3);
            }
        },
        f: {
            print: function (value) {
                return _length(value, 3);
            }
        },
        h: {
            print: function (value) {
                return _length(value, 3);
            }
        },
        reach_top_headset: {
            label: "Reach to the top of upper cup",
            print: function (value) {
                return _length(value, 3);
            }
        },
        stack_top_headset: {
            label: "Stack to the top of upper cup",
            print: function (value) {
                return _length(value, 3);
            }
        }
    },
    /* eslint-enable camelcase, max-len */

    /**
     * Build and return the list of all attributes (existing, new and calculated)
     * @return {object} - the list of all attributes as object; the attribute names are the key in the object
     */
    _allAttributes: function () {
        return _.extend({}, this._existingAttributes, this._newAttributes, this._calculatedAttributes);
    },

    /**
     * Scale the geometry chart image
     * @param {number} increment - whether to scale up (+1), down (-1), or reset (0)
     */
    _scaleImage: function (increment) {
        var geometryChartWidth = increment === 0
                ? 1000
                : this.state.geometryChartWidth + (increment * 100);
        this.setState({
            geometryChartWidth: geometryChartWidth
        });
    },

    /**
     * Check whether there are any invalid attribute values on the state.
     * @return {boolean} - true if at least one attribute value is invalid, false otherwise
     */
    _isFormInvalid: function () {
        var self = this;

        return _.some(
                _.union(
                    _.keys(this._existingAttributes),
                    _.keys(this.newAttributes)
                ),
                function (attribute) {
                    return self.state[attribute + "-valid"] !== true;
                }
        );
    },

    _calculate: function () {
        var self = this;

        var formInvalid = this._isFormInvalid();

        this.setState({
            invalidAttributes: formInvalid
        });

        if (formInvalid === true) {
            return;
        }

        // create a new geometry with all attribute values on the state
        // (these are the input attribute, ie. the attributes in existingAttributes and newAttributes)
        var geometry = {};
        _.each(
            _.extend({}, this._existingAttributes, this._newAttributes),
            function (attribute, attributeName) {
                // convert the input value if there's a converter set for the attribute, otherwise leave it as is
                var converter = attribute.converter || _.identity;
                var value = converter(parseFloat(self.state[attributeName]));
                geometry[attributeName] = value;
            }
        );

        // and this is the business logic; add the calculated values to the current geometry
        /* eslint-disable camelcase, max-len */
        geometry.old_s_plus_headset = (geometry.old_stack - geometry.old_bb) / Math.sin(geometry.old_n) - geometry.headtube;
        geometry.old_z = geometry.old_rake / Math.sin(geometry.old_n);
        geometry.old_t = geometry.old_rake / Math.tan(geometry.old_n);
        geometry.old_s = Math.sqrt(Math.pow(geometry.old_fork, 2) - Math.pow(geometry.old_rake, 2)) - geometry.old_t;
        geometry.old_headset = geometry.old_s_plus_headset - geometry.old_s;
        geometry.old_wb_minus_z = geometry.old_wb - geometry.old_z;
        geometry.x = Math.sqrt(Math.pow(geometry.old_wb_minus_z, 2) + Math.pow(geometry.old_s_plus_headset, 2) - 2 * geometry.old_wb_minus_z * geometry.old_s_plus_headset * Math.cos(geometry.old_n));
        geometry.m = Math.asin(Math.sin(geometry.old_n) * (geometry.old_wb - geometry.old_z) / geometry.x);
        geometry.old_a = Math.asin(geometry.old_rake / geometry.old_fork);
        geometry.old_o = Math.PI - geometry.old_a - (Math.PI - geometry.old_n);
        geometry.new_v = Math.sqrt(Math.pow(geometry.x, 2) + Math.pow(geometry.new_headset, 2) - 2 * geometry.x * geometry.new_headset * Math.cos(geometry.m));
        geometry.new_k = Math.acos((Math.pow(geometry.new_v, 2) + Math.pow(geometry.new_headset, 2) - Math.pow(geometry.x, 2)) / 2 / geometry.new_v / geometry.new_headset);
        geometry.new_l = Math.PI - geometry.new_k;
        geometry.new_a = Math.asin(geometry.new_rake / geometry.new_fork);
        geometry.new_wb = Math.sqrt(Math.pow(geometry.new_v, 2) + Math.pow(geometry.new_fork, 2) - 2 * geometry.new_v * geometry.new_fork * Math.cos(geometry.new_l + geometry.new_a));
        geometry.new_o = Math.acos((Math.pow(geometry.new_fork, 2) + Math.pow(geometry.new_wb, 2) - Math.pow(geometry.new_v, 2)) / 2 / geometry.new_fork / geometry.new_wb);
        geometry.new_n = Math.PI - (Math.PI - geometry.new_a - geometry.new_o);
        geometry.old_q = Math.asin(geometry.old_bb / geometry.chainstay);
        geometry.old_r = Math.asin(geometry.old_s_plus_headset * Math.sin(geometry.old_n) / geometry.x);
        geometry.old_r2 = Math.acos((Math.pow(geometry.x, 2) + Math.pow(geometry.old_wb_minus_z, 2) - Math.pow(geometry.old_s_plus_headset, 2)) / 2 / geometry.x / geometry.old_wb_minus_z);
        geometry.new_t = geometry.new_rake / Math.tan(geometry.new_n);
        geometry.new_z = Math.sqrt(Math.pow(geometry.new_t, 2) + Math.pow(geometry.new_rake, 2));
        geometry.new_s = Math.sqrt(Math.pow(geometry.new_fork, 2) - Math.pow(geometry.new_rake, 2)) - geometry.new_t;
        geometry.new_s2 = Math.sin(geometry.new_o) / Math.sin(Math.PI - geometry.new_n) * geometry.new_fork;
        geometry.new_r = Math.acos((Math.pow(geometry.x, 2) + Math.pow((geometry.new_wb - geometry.new_z), 2) - Math.pow((geometry.new_s + geometry.new_headset), 2)) / 2 / geometry.x / (geometry.new_wb - geometry.new_z));
        geometry.new_q = geometry.old_q + geometry.old_r - geometry.new_r;
        geometry.new_g = Math.cos(geometry.new_q) * geometry.chainstay;
        geometry.new_f = geometry.new_wb - geometry.new_g;
        geometry.new_h = geometry.new_f - geometry.new_z;
        geometry.new_bb = Math.sin(geometry.new_q) * geometry.chainstay;
        geometry.new_reach= geometry.new_h - (Math.cos(geometry.new_n) * (geometry.new_s + geometry.new_headset + geometry.headtube));
        geometry.new_stack= Math.sin(geometry.new_n) * (geometry.new_s + geometry.new_headset + geometry.headtube) + geometry.new_bb;
        geometry.new_reach_top_headset = geometry.new_h - (Math.cos(geometry.new_n) * (geometry.new_s + geometry.new_headset + geometry.headtube + geometry.new_headset_top));
        geometry.new_stack_top_headset = Math.sin(geometry.new_n) * (geometry.new_s + geometry.new_headset + geometry.headtube + geometry.new_headset_top) + geometry.new_bb;
        geometry.new_front_center = Math.sqrt(Math.pow(geometry.new_bb, 2) + Math.pow(geometry.new_f, 2));
        geometry.seattube_for_toptube_aprox = (geometry.old_toptube - geometry.old_reach) / Math.sin(Math.PI/2 - geometry.old_seattube_angle);
        geometry.new_seattube_angle_aprox = geometry.old_seattube_angle + (geometry.old_r - geometry.new_r);
        geometry.new_toptube_aprox = geometry.new_reach + geometry.seattube_for_toptube_aprox * Math.sin(Math.PI/2 - geometry.new_seattube_angle_aprox);
        /* eslint-enable camelcase, max-len */

        // if the geometry already exists, don't add it
        var exists = _.find(this.state.geometries, function (existingGeometry) {
            return hash(existingGeometry) === hash(geometry);
        });

        if (exists) {
            this.setState({
                duplicateGeometry: true
            });
        }
        else {
            var geometries = _.clone(this.state.geometries);
            geometries.push(geometry);
            this.setState({
                geometries: geometries
            });
        }
    },

    _deleteGeometry: function (index) {
        var geometries = _.clone(this.state.geometries);
        geometries.splice(index, 1);
        this.setState({
            geometries: geometries
        });
    },

    /**
     * Set the new attribute value on the state;
     * also validate the attribute and set a flag on the state
     * indicating whether the value is valid or not.
     * @param {string} attributeName - the name of the attribute being changed
     * @param {object} event - the change event
     */
    _onAttributeChange: function (attributeName, event) {
        // validate the new value and set the validation result on the state
        var validator = this._allAttributes()[attributeName].validator;

        if (validator) {
            var state = {};

            // set the new value on the state
            var value = event.target.value;
            state[attributeName] = value;

            // validate the new value and set the result on the state
            state[attributeName + "-valid"] = validator(value);

            // reset the global invalid state
            state.invalidAttributes = undefined;
            state.duplicateGeometry = undefined;

            this.setState(state);
        }
        else {
            console.log("Cannot find the attribute '", attributeName, ", in any attribute set");
        }
    },

    _buildAttributeGroup: function (attributes) {
        var self = this;

        return _.map(
            attributes,
            function (attribute, attributeName) {
                // add the invalid CSS class if the attribute value has been flagged as invalid
                var containerClassNames = classNames(
                    "attribute",
                    {
                        invalid: self.state[attributeName + "-valid"] !== true
                    }
                );

                return (
                    <label key={attributeName} className={containerClassNames}>
                        <span className="attributeName">{attribute.label}:</span>
                        <input type="text"
                                className="attributeValue"
                                name={attributeName}
                                value={self.state[attributeName]}
                                onChange={_.partial(self._onAttributeChange, attributeName)}
                                placeholder={attribute.placeholder} />
                    </label>
                );
            }
        );
    },

    getInitialState: function () {
        return {
            geometryChartWidth: 1000,
            geometries: []
        };
    },

    /**
     * Return a list of unique attributes names (old & new are returned as one)
     * @return {array} - a list of unique attribute names (ie. old and new are returned as one)
     */
    _uniqueAttributeNames: function () {
        var self = this;

        return _.uniq(_.map(this._allAttributes(), function (attribute, attributeName) {
            return self._stripOldNewPrefix(attributeName);
        }));
    },

    _buildGeometryTableHeader: function () {
        var self = this;

        // build two rows for the column header; the first column lists the frame sizes (ie. geometry.old_seattube),
        // the second one list the "existing" and "new" labels for each frame size
        var frameSize = [<td key="empty">Size</td>];
        var oldNew = [<td key="empty">&nbsp;</td>];

        _.map(this.state.geometries, function (geometry, index) {
            frameSize.push(
                <td key={hash(geometry)} colSpan="2">
                    <div className="headerDelete">
                        <input type="button"
                                name="delete"
                                value="X"
                                title="Remove this geometry from table"
                                onClick={self._deleteGeometry.bind(null, index)} />
                    </div>
                    <div className="headerFrameSize">{_length(geometry.old_seattube)}</div>
                </td>
            );

            oldNew.push(
                <td key={hash(geometry) + "-existing"}>existing</td>
            );
            oldNew.push(
                <td key={hash(geometry) + "-new"}>new</td>
            );
        });

        return {
            frameSize: frameSize,
            oldNew: oldNew
        };
    },

    /**
     * Return a new string which doesn't have the old_ or new_ prefix, if present on the given name.
     * @param {string} name - the attribute name
     * @return {string} - the stripped name
     */
    _stripOldNewPrefix: function (name) {
        return name.match(/(old|new)_/) ? name.substr(4) : name;
    },

    /**
     * Given the attribute name (without prefix) as set on the state, find the attribute and return it.
     * @param {string} nameWithoutPrefix - the attribute name without the old_/new_ prefix
     * @return {object} - the attribute for the given name
     */
    _getAttribute: function (nameWithoutPrefix) {
        var self = this;

        // find the attribute name in the list of all attribute,
        // which matches the given name (excluding the old_ / new_ prefix)
        var attributeName = _.find(_.keys(this._allAttributes()), function (name) {
            return self._stripOldNewPrefix(name) === nameWithoutPrefix;
        });

        return {
            name: attributeName,
            attribute: this._allAttributes()[attributeName]
        };
    },

    /**
     * Return the formatted label for the given attribute, to be displayed in the geometry table.
     * @param {object} attribute - the attribute
     * @param {string} attributeName - the attribute name
     * @return {string} the attribute label to display
     */
    _getAttributeLabel: function (attribute, attributeName) {
        // If the attribute doesn't have a label, use the attribute name.
        return attribute.label || attributeName;
    },

    _buildGeometryTableRow: function (attribute, name, nameWithoutPrefix) {
        var self = this;

        var cells = [];

        var cellClassNames = classNames({
            primary: self._existingAttributes.hasOwnProperty(name) || self._newAttributes.hasOwnProperty(name)
        });

        // add the label cell
        cells.push(
            <td key="label" className={cellClassNames}>{self._getAttributeLabel(attribute, name)}</td>
        );

        // for each geometry, add two cells for the current attribute: one with the old value, one with the new one
        _.each(self.state.geometries, function (geometry) {
            var oldValue, newValue, confirmedOldValue, confirmedNewValue;
            var oldAttributeExists = geometry.hasOwnProperty("old_" + nameWithoutPrefix);
            var newAttributeExists = geometry.hasOwnProperty("new_" + nameWithoutPrefix);
            var newAproxAttributeExists = geometry.hasOwnProperty("new_" + nameWithoutPrefix + "_aprox");

            var confirmedOldAttributeExists = geometry.hasOwnProperty("old_" + nameWithoutPrefix + "2");
            var confirmedNewAttributeExists = geometry.hasOwnProperty("new_" + nameWithoutPrefix + "2");

            var staticAttributeExists = geometry.hasOwnProperty(nameWithoutPrefix);

            if (oldAttributeExists || newAttributeExists || newAproxAttributeExists) {
                oldValue = attribute.print(geometry["old_" + nameWithoutPrefix]);

                // use the aprox new attribute if exists, else fall back to new attribute
                if (newAproxAttributeExists) {
                    newValue = attribute.print(geometry["new_" + nameWithoutPrefix + "_aprox"]) + " **";
                }
                else {
                    newValue = attribute.print(geometry["new_" + nameWithoutPrefix]);
                }

                // if there's a second calculation for this attribute, get this second value
                var confirmedOldValue = confirmedOldAttributeExists
                        ? attribute.print(geometry["old_" + nameWithoutPrefix + "2"]) + " *"
                        : "";
                var confirmedNewValue = confirmedNewAttributeExists
                        ? attribute.print(geometry["new_" + nameWithoutPrefix + "2"]) + " *"
                        : "";
            }
            else if (staticAttributeExists) {
                oldValue = newValue = attribute.print(geometry[nameWithoutPrefix]);
            }
            else {
                return;
            }

            cells.push(
                <td key={hash(geometry) + "-old"} className={cellClassNames}>
                    {oldValue}
                    { confirmedOldValue &&
                        <span><br />{confirmedOldValue}</span>
                    }
                </td>
            );
            cells.push(
                <td key={hash(geometry) + "-new"} className={cellClassNames}>
                    {newValue}
                    { confirmedNewValue &&
                        <span><br />{confirmedNewValue}</span>
                    }
                </td>
            );
        });

        return (<tr key={nameWithoutPrefix}>{cells}</tr>);
    },

    _buildGeometryTableContent: function () {
        if (this.state.geometries.length === 0) {
            return;
        }

        var self = this;

        // iterate over each unique geometry attribute, to build the rows;
        // I assume all geometries have the same attributes
        var rows = [];
        _.each(
            this._uniqueAttributeNames(this.state.geometries[0]),
            function (attributeNameWithoutPrefix) {
                // find the attribute (old or new) whose name matches the name without prefix
                var attributeDetails = self._getAttribute(attributeNameWithoutPrefix);

                // add a row for the attribute values
                rows.push(self._buildGeometryTableRow(
                    attributeDetails.attribute,
                    attributeDetails.name,
                    attributeNameWithoutPrefix));
            }
        );

        return rows;
    },

    render: function () {
        var geometryImageStyle = {
            width: this.state.geometryChartWidth
        };

        var geometryTableHeader = this._buildGeometryTableHeader();
        var geometryTableContent = this._buildGeometryTableContent();


        return (
            <div>
                <p className="mainTitle">Frame geometry comparator</p>
                <p className="mainSummary">
                    This tool lets you calculate how the frame geometry changes
                    with a different lower cup and with a fork having a different length/rake.
                    <br />
                    * The assumption is that the old lower cup height is not known;
                    it is calculated from the stack, reach, headset angle, etc.
                </p>

                <div className="section">
                    <div className="zoomButtons">
                        <input type="button" onClick={this._scaleImage.bind(null, -1)} value="-" title="Zoom out" />
                        <input type="button" onClick={this._scaleImage.bind(null, +1)} value="+" title="Zoom in" />
                        <input type="button" onClick={this._scaleImage.bind(null, 0)} value="o" title="Reset" />
                    </div>
                    <object type="image/svg+xml"
                            data={frameGeometrySvg}
                            className="geometryImage"
                            style={geometryImageStyle}>
                        Cannot display the frame geometry;
                        your browser does not support SVG.
                    </object>
                </div>

                <div className="section">
                    <div className="summary">
                        Enter all the required values below (in milimeters and degrees) and click <b>Calculate</b>.
                        A new column will be added to the result table below.
                    </div>
                    {
                        this.state.invalidAttributes &&
                        (<p>
                            The values in red below are invalid.
                            Fix them and click <i>Calculate</i> again.
                        </p>)
                    }
                    {
                        this.state.duplicateGeometry &&
                        (<p>
                            This geometry has already been calculated.
                        </p>)
                    }
                    <fieldset className="attributeGroup">
                        <legend className="attributeGroupName">Current geometry</legend>
                        {this._buildAttributeGroup(this._existingAttributes)}
                    </fieldset>
                    <fieldset className="attributeGroup">
                        <legend className="attributeGroupName">New geometry</legend>
                        {this._buildAttributeGroup(this._newAttributes)}
                    </fieldset>
                    <input type="button" className="attributeButton" value="Calculate" onClick={this._calculate} />
                </div>

                { geometryTableContent &&
                <div className="section">
                    <div className="title">
                        Geometry comparison
                    </div>
                    <table className="geometryTable">
                        <thead>
                            <tr key="frameSize">
                                {geometryTableHeader.frameSize}
                            </tr>
                            <tr key="oldNew">
                                {geometryTableHeader.oldNew}
                            </tr>
                        </thead>
                        <tbody>
                            {geometryTableContent}
                        </tbody>
                    </table>
                    <div className="geometryTableNotes">
                        * calculated through a different method to confirm the first calculation
                        <br />
                        ** aproximate calculation
                    </div>
                </div>
                }
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById("app"));
