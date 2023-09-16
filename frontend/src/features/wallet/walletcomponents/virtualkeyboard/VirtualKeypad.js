'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
	Text,
	View,
	TouchableOpacity,
	Image,
  StyleSheet
} from 'react-native';
import { ViewPropTypes, TextPropTypes } from 'deprecated-react-native-prop-types';
import { RFPercentage } from 'react-native-responsive-fontsize';

const BACK = 'back';
const CLEAR = 'clear';
const PRESS_MODE_STRING = 'string';

export default class VirtualKeyboard extends Component {
	static propTypes = {
		pressMode: PropTypes.oneOf(['string', 'char']),
		color: PropTypes.string,
		backspaceImg: PropTypes.number,
		applyBackspaceTint: PropTypes.bool,
		decimal: PropTypes.bool,
		decimalSymbol: PropTypes.string,
		rowStyle: ViewPropTypes.style,
		cellStyle: ViewPropTypes.style,
		textStyle: TextPropTypes.style,
		clearOnLongPress: PropTypes.bool,
	}

	static defaultProps = {
		pressMode: 'string',
		color: 'gray',
		backspaceImg: require('../../../../assets/wallet/BackSpace.png'),
		applyBackspaceTint: true,
		decimal: false,
		clearOnLongPress: false,
	}

	constructor(props) {
		super(props);
	}

	renderDecimal() {
		if (this.props.decimal) {
			return this.props.decimalSymbol ? this.Cell(this.props.decimalSymbol) : this.Cell('.');
		} else {
			return <View style={{ flex: 1 }} />;
		}
	}

	render() {
		return (
      <View>
        {/* <ConvPad /> */}
        <View style={[styles.container, this.props.style]}>
          {this.Row([1, 2, 3])}
          {this.Row([4, 5, 6])}
          {this.Row([7, 8, 9])}
          <View style={[styles.row, this.props.rowStyle]}>
            {this.Backspace()}
            {this.Cell(0)}				
            {this.Cell('완료')}
          </View>
			  </View>
      </View>
		);
	}

	Backspace() {
		return (
			<TouchableOpacity accessibilityLabel='backspace' style={styles.backspace} onPress={() => { this.props.addMoney(BACK) }}
				onLongPress={() => { if(this.props.clearOnLongPress) this.props.addMoney(CLEAR) }}
			>
				<Image source={this.props.backspaceImg} resizeMode='contain' style={this.props.applyBackspaceTint && ({ tintColor: this.props.color })} />
			</TouchableOpacity>
		);
	}

	Row(numbersArray) {
		let cells = numbersArray.map((val) => this.Cell(val));
		return (
			<View style={[styles.row, this.props.rowStyle]}>
				{cells}
			</View>
		);
	}

	Cell(symbol) {
		return (
			<TouchableOpacity style={[styles.cell, this.props.cellStyle]} key={symbol} 
				accessibilityLabel={symbol.toString()} onPress={() => { this.props.addMoney(symbol.toString()) }}>
				<Text style={[styles.number, this.props.textStyle, { color: symbol==='완료'?'#498AC6':this.props.color }]}>{symbol}</Text>
			</TouchableOpacity>
		);
	}

}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20,
		alignItems: 'flex-start',
	},
	row: {
		flexDirection: 'row',
		marginTop: 15,
	},
	number: {
		fontSize: RFPercentage(3),
		textAlign: 'center',
	},
	backspace: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	cell: {
		flex: 1,
		justifyContent: 'center',
	},
});
