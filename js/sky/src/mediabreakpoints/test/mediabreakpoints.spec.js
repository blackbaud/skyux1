/*jshint browser: true, jasmine: true */
/*global enquire, inject, module */

describe('Media breakpoints service', function () {
    'use strict';

    var bbMediaBreakpoints,
        bbMediaBreakpointsConfig;
    
    function validateExpectedBp(bp, expected) {
        var p;
        
        for (p in bp) {
            if (bp.hasOwnProperty(p)) {
                expect(bp[p]).toBe(expected === p);
            }
        }
    }

    beforeEach(module('ngMock'));
    beforeEach(module('sky.mediabreakpoints'));

    beforeEach(inject(function (_bbMediaBreakpoints_, _bbMediaBreakpointsConfig_) {
        bbMediaBreakpoints = _bbMediaBreakpoints_;
        bbMediaBreakpointsConfig = _bbMediaBreakpointsConfig_;
    }));
    
    function callEnquireListener(mediaQuery) {
        // Fake out how enquire calls breakpoint listeners.
        var enquireQuery = enquire.queries[mediaQuery];
        
        spyOn(enquireQuery, 'matches').and.returnValue(true);
        
        enquireQuery.listener(enquireQuery.mql);
    }

    it('should register enquire breakpoints for each configured media query', function () {
        var configQueries = bbMediaBreakpointsConfig.mediaQueries,
            configQueryCount = 0,
            mediaQuery,
            p,
            testBp;
        
        function breakpointHandler(bp) {
            testBp = bp;
        }
        
        bbMediaBreakpoints.register(breakpointHandler);

        for (p in configQueries) {
            if (configQueries.hasOwnProperty(p)) {
                mediaQuery = configQueries[p];
                
                callEnquireListener(mediaQuery);
                
                // Check the triggered breakpoint against the media query that triggered it.
                validateExpectedBp(testBp, p);
                
                // Make sure getCurrent() returns the last triggered breakpoint.
                expect(bbMediaBreakpoints.getCurrent()).toBe(testBp);
                
                configQueryCount++;
            }
        }
        
        expect(configQueryCount).toBe(4);
    });

    it('should unregister listeners', function () {
        var breakpointCallCount = 0;
        
        function breakpointHandler() {
            breakpointCallCount++;
        }

        // Registering the listener causes the handler to be called immediately, so we should expect
        // 2 calls after registering and then firing the breakpoint.
        bbMediaBreakpoints.register(breakpointHandler);

        callEnquireListener(bbMediaBreakpointsConfig.mediaQueries.xs);

        expect(breakpointCallCount).toBe(2);
        
        bbMediaBreakpoints.unregister(breakpointHandler);

        callEnquireListener(bbMediaBreakpointsConfig.mediaQueries.lg);
        
        // The handler function shouldn't be called again after being unregistered.
        expect(breakpointCallCount).toBe(2);
    });
});