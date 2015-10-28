/*jshint jasmine: true */
/*global inject, module */

describe('Checklist utility service', function () {
    'use strict';
    
    var bbChecklistUtility,
        items;
    
    beforeEach(module('sky.checklist.utility'));
    
    beforeEach(inject(function (_bbChecklistUtility_) {
        bbChecklistUtility = _bbChecklistUtility_;
    }));
    
    beforeEach(function () {
        items = [
            {
                prop1: 'A',
                prop2: 'b'
            },
            {
                prop1: 'c',
                prop2: 'D'
            },
            {
                prop1: 'E',
                prop2: 'f'
            }
        ];
    });
    
    describe('add() method', function () {
        it('should add an item to the array if an item with matching properties doesn\'t already exist', function () {
            var itemsCopy,
                length = items.length,
                newItem;

            newItem = {
                prop1: 'G',
                prop2: 'h'
            };

            bbChecklistUtility.add(items, newItem);

            length = items.length;

            expect(items[length - 1]).toBe(newItem);

            itemsCopy = items.slice(0);

            bbChecklistUtility.add(
                items,
                {
                    prop1: 'A',
                    prop2: 'b'
                }
            );

            expect(items).toEqual(itemsCopy);
        });
        
        it('should create and return a new array if one is not supplied', function () {
            var newItems = bbChecklistUtility.add(null, {
                a: 'b'
            });
            
            expect(newItems).toEqual([{
                a: 'b'
            }]);
        });
    });
    
    describe('remove() method', function () {
        it('should remove an item whose properties are the same as the specified object', function () {
            var itemToRemove = items[0];
            
            bbChecklistUtility.remove(items, {
                prop1: 'A',
                prop2: 'b'
            });
            
            expect(items[0]).not.toBe(itemToRemove);
        });
    });
    
    describe('contains() method', function () {
        it('should match an item with the same properties as the specified object', function () {
            expect(bbChecklistUtility.contains(items, {
                prop1: 'A',
                prop2: 'b'
            })).toBe(true);
            
            expect(bbChecklistUtility.contains(items, {
                prop1: 'a',
                prop2: 'B'
            })).toBe(false);
        });
    });
});