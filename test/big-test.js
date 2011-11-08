var vows = require('vows'),
    assert = require('assert');

var fs = require('fs'),
	nbt = require('../nbt');

var bigtest = __dirname + '/../sample/bigtest.nbt.gz';

// Create a Test Suite
vows.describe('Testing nbt parsing').addBatch({
	'open a .nbt.gz': {
		topic: function(){
			fs.readFile(bigtest, this.callback);
		},
		'should not give an error':function(err,data){
			assert.isNull(err);
		},
		'after successfull open':{
			topic: function(data){
				nbt.parse(data, this.callback)
			},
			'parses ok':function(err, result){
				assert.isNull(err);
				assert.include(result, 'Level');
			},
			'after successful parse check Level':{
				topic: function(result){
					return result.Level;
				},
				'stringTest':function(level){
					assert.include(level, 'stringTest');
					assert.isString(level.stringTest);
					//test for utf-8 characters
					assert.equal(level.stringTest, 'HELLO WORLD THIS IS A TEST STRING ÅÄÖ!');
				},
				'longTest':function(level){
					assert.include(level, 'longTest');
					assert.isNumber(level.longTest);
				},
				'nestedCompoundTest':function(level){
					assert.include(level, 'nested compound test');
					var obj = level['nested compound test'];
					assert.isObject(obj);
					assert.include(obj, 'ham');
					assert.include(obj, 'egg');

				}


			}
		}
		

	}
}).export(module);