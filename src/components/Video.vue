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
        this.init();
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
        
	},
	data() {
		return {
     
		}
	}
}
</script>