// define a global custom component
// note: don't use the naming convention myComp
// it doesn't work with HTML
Vue.component('mycomp',{
    template : '<div><h1>This is my component</h1></div>'
 });

 // local registeration of a component
 /* var vm = new Vue({ 
    el: '#component', 
    components: { 
       'mycomp': { 
           template : 'div><h1>This is my component</h1></div>'
        } 
    } 
 }); */


