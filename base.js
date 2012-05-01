/********************************************************************
*
* Filename:		base.js
* Description:	Creates the 'base' class.
*	
********************************************************************/

(function(window){


var base = function ( args ) {
	
		if ( this instanceof arguments.callee ) {
		
			this.init.apply( this, args.callee ? args : arguments );
			
			return this;
		
		} else { 
		
			return new arguments.callee( arguments );
		
		}
	
	},

	ArrayProto = Array.prototype,

	nativeForEach = ArrayProto.forEach,

	slice = ArrayProto.slice,

	breaker = {},

	each = function(obj, iterator, context) {

		if (obj == null){

			return;

		}
	    if (nativeForEach && obj.forEach === nativeForEach) {

			obj.forEach(iterator, context);

	    } else if (obj.length === +obj.length) {

			for (var i = 0, l = obj.length; i < l; i++) {

				if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;

			}

	    } else {

			for (var key in obj) {

				if (_.has(obj, key)) {

					if (iterator.call(context, obj[key], key, obj) === breaker){

						return;

					}

				}

			}

	    }

	},


	extend = base.extend = function(obj) {

		each(slice.call(arguments, 1), function(source) {

			for (var prop in source) {

				obj[prop] = source[prop];

			}

		});

		return obj;
	};

	extend(base, {
	
		addStaticMethods : function addStaticMethods(methods){
			base.extend(this, methods);
		},
		
		addInstanceMethods : function addInstanceMethods(methods){
			base.extend(this.prototype, methods);
		},
		
		createChild : function createChild(){
		
			var child = function base( args ){
				
				if ( this instanceof arguments.callee ) {
		
					this.init.apply( this, args.callee ? args : arguments );
			
					return this;
		
				} else { 
		
					return new arguments.callee( arguments );
		
				}
			};
			
			base.extend(child, this);
			base.extend(child.prototype,  this.prototype);

			return child;
		
		}
	
	});
	
	base.addInstanceMethods({
	
		init : function baseInit( config ){
		
			return this;
			
		}
	
	});

	window.base = base;

}(window));

	
	
	