<template>

</template>

<style scoped>


</style>

<script>
import {login} from '@/utils/http'
import { mapState, mapActions } from 'vuex'
import Tool from "../utils/Tool"

export default {
	created() {
        // this.init();
        // this.fn();
        this.fn1();
	},
	mounted() {
		
	},
	computed: {

	},
	methods: {
        init(){
            //值类型
            var a=100;
            var b=a;
            a = 200;
            console.log('init='+b) //100
            //引用类型
            var a={age:20};
            var b=a;
            b.age = 21;
            console.log('init2='+a.age)
            //typeof运算符

            //值类型
            console.log('typeof undefined ='+typeof undefined)//undefined
            console.log('typeof abc ='+typeof 'abc')//string
            console.log('typeof 123 ='+typeof 123)//number
            console.log('typeof true ='+typeof true)//bollen
            //引用类型
            console.log('typeof [] ='+typeof [])//object
            console.log('typeof {} ='+typeof {})//object
            console.log('typeof null ='+typeof null)//空指针  未引入任何对象
            console.log('typeof console.log ='+typeof console.log)//function

            //if语句
            var a =true; if(a){console.log("执行(a)")}  
            var b=100; if(b){console.log("执行if(b)")} //强制转换100 为true
            var c=''; if(c){console.log("执行if(c)")} else {console.log("未执行if(c)")} //强制转换 '' 为false

            //构造函数
            function Foo(name,age){
                this.name = name;
                this.age = age;
                this.class="class-1"
            }
            var f= new Foo('zhangsan',20)
            console.log(f.name);
            //var a = {};//var a = new object()
            //var a = [];//var a = new Array()
            //function Foo(){}//var Foo = new Function(...)
            //原型规则和示例
            var obj ={};
            obj.a = 100;
            var arr = [];
            arr.a = 100;
            function fn(){}
            fn.a = 100;

            console.log(obj.__proto__);
            console.log(arr.__proto__);
            console.log(fn.__proto__);

            console.log(fn.prototype);
            console.log(obj.__proto__===Object.prototype)//obj的构造函数就是Object
        },
        fn(){
            //函数声明和函数表达式
            function fn(){
                //函数声明
            }
            var fn = function(){
                //表达式
            }
            console.log(a);// undefined 
            var a = 100;
            fn1('zhangsan','30')
            function fn1(name,age){
                console.log(arguments.length) //2
                age = 20;
                console.log(name,age);//zhangsan20
                var age;
            }
        },
        //this 要在执行时才能确认值，定义时无法确认

        fn1(){
            var a = {
                'name':'zhangsan',
                fn:function(){
                    console.log(this.name);
                }
            }
            a.fn() //this指向a zhangsan 
            a.fn.call({'name':'lisi'}) //this指向 {'name':'lisi'} lisi 
            var fn1 = a.fn;
            fn1() //this指向window  undefined

            //this作为构造函数来执行
            function Fun(name){
                this.name = name;
                console.log(this)
            }
            var fn = new Fun('zhangsan');

            //作为对象属性执行
            var obj = {
                name:'A',
                printName:function(){
                    console.log(this.name)
                }
            }
            obj.printName();
            //作为普通函数执行
            function fn(){
                console.log(this)
            }
            fn();//this===window
            //call apply bind
            function fn1(name){
                alert(name)
                console.log(this)
            }
            fn1.call({x:100},'lisi') //this ==={x：100}

            var fn2 = function (name){
                alert(name)
                console.log(this)
            }.bind({y:200})
            fn2('lisi') //this ==={y：200}

            //作用域  作用域链
            var a = 100;
            function fn (){
                var b = 200;
                //自由变量：当前作用域没有定义的变量
                console.log('a='+a +',b='+b)
            }
            fn()
            //闭包 ：函数作为返回值  函数作为参数传递
            //1.函数作为返回值
            function F1(){
                var a = 100;
                return function(){
                    console.log(a) //自由变量  父作用域找
                }
            }
            var f1 = F1();
            var a = 200;
            f1(); //100

            //2.函数作为参数传递
            function F1(){
                var a = 100;
                return function(){
                    console.log(a) //自由变量  父作用域找
                }
            }
            var f1 = F1();
            function F2(fn){
                var a =200;
                fn();
            }
            F2(f1) //100

            //闭包的应用：主要用于封装变量，收敛权限
            function isFirstLoad(){
                var _list = [];
                return function (id){
                    if(_list.indexOf(id)>=0){
                        return false;
                    } else {
                        _list.push(id)
                        return true;
                    }
                }
            }
            var firstLoad = isFirstLoad();
            firstLoad(10);
            firstLoad(10);
            firstLoad(20);

            //异步
            //1.什么是异步
            // 2.使用场景 
            //   1、定时任务 setTimeout setInverval
            //   2、网络请求 ajax请求 动态加载<img>
            //   3、事件绑定 click keyup...
            //3.异步和单线程

            //异步场景
            console.log(100)
            setTimeout(function(){console.log(200)},1000)
            console.log(300)  //100 300 200
            //对比同步
            console.log(100)
            alert(200)
            console.log(300)  //同步会有阻塞


        }
        
	},
	data() {
		return {
     
		}
	}
}
</script>