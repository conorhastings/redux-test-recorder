 export default function createAvaTest({state, actions, imports, reducer, equalityFunction}) {
   return (`var test = require('ava');
 ${imports}
 ${reducer}
 var equality = ${equalityFunction};

 test('expected state returned for each action', function(t) {
   var state = ${state};
   var actions = ${JSON.stringify(actions, null, 2)};
   actions.forEach(function(action, index) {
     var result = reducer(state, action.action);
     state = result;
     t.ok(equality(result, action.nextState), action.action.type + '(action index ' + index +') correctly updated state');
   });
 });`
   );
 }