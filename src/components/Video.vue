<template>
<p style="color:blue">这是p标签</p>
</template>

<style scoped>
p{color:red;}

</style>

<script>
import {login} from '@/utils/http'
import { mapState, mapActions } from 'vuex'
import Tool from "../utils/Tool"

export default {
	created() {
        // this.init();
        // this.fn();
        // this.fn1();
        // this.api();
        this.webApi();
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
            console.log('init2='+a.age)//21
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
        fn1(){
            //this 要在执行时才能确认值，定义时无法确认
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
            firstLoad(10);//true
            firstLoad(10);//false
            firstLoad(20);//true

            //异步
            //1.什么是异步
            // 2.使用场景 
            //   1、定时任务 setTimeout setInverval
            //   2、网络请求 ajax请求 动态加载<img>
            //   3、事件绑定 click keyup... （和上面两个的区别：可以执行多次。相同点：都需要等待） 
            //3.异步和单线程（）

            //异步场景
            console.log(100)
            setTimeout(function(){console.log(200)},1000)
            console.log(300)  //100 300 200
            
            //对比同步
            console.log(100)
            alert(200)
            console.log(300)  //同步会有阻塞
            
            //单线程
            console.log(100)
            setTimeout(function(){
                console.log(200)
            }) // 遇到异步。。先拿出来。。把能执行的都执行了之后，如果能立即执行 就执行
            console.log(300) //100 300 200
            //理解：执行100 
                    // 执行setTimeout后，传入setTimeout的函数会被暂存起来，不会立即执行（单线程特点：不会同时干两件事）
                    // 执行300
                    // 待所有程序执行完，处于空闲状态时，会立马看有没有暂存起来的要执行
                    // 发现暂存起来的setTimeout中的函数 无需等待时间，就立即执行
            //同步和异步区别
            // 1、同步会阻塞代码
            // 2、alert是同步 setTimeout是异步
        },
        api(){
            //Date
            console.log(Date.now()) // 1513142732675  获取当前时间毫秒数,从1970年开始
            var d = new Date();
            console.log("获取当前毫秒数："+d.getTime())// 获取毫秒数
            console.log("年："+d.getFullYear())//年
            console.log("月："+parseInt(d.getMonth()+1))//月 （0-11）当前月份要+1
            console.log("日："+d.getDate())//日 （0-31）
            console.log("时："+d.getHours())//小时 （0-23）
            console.log("分："+d.getMinutes())//分钟（0-59）
            console.log("秒："+d.getSeconds())//秒（0-59）
            //Math
            console.log(Math.random()) //主要清楚缓存用
            var random  = Math.random();
            var random = random + '0000000000' //后面加10个0
            var random = random.slice(0,10);
            console.log("获取随机数"+random)
            //数组api
            // forEach 遍历所有元素
            // every 判断所有元素是否都符合条件
            // some 判断是否有至少一个元素符合
            // sort 排序
            // map 对元素重新组装，生成新数组
            // filter 过滤符合条件的元素 
            var arr = [1,3,2,5];
            arr.forEach(function(item,index){
                //遍历数组的所有元素 item：值，index：下标
                console.log(index,item)
            })
            var result = arr.every(function(item,index){
                //用来判断所有的数组元素，都满足一个条件
                if(item<4){
                    return true;
                }
            })
            console.log("数组结果："+result)//true 

            var _someresult = arr.some(function(item,index){
                //有一个满足条件即可
                if(item<2){
                    return true;
                }
            })
            console.log("some数组结果"+_someresult);

            var _sortresult = arr.sort(function(a,b){
                //从小到大
                return a-b;
            })
            console.log("sort排序："+_sortresult)

            var arr2 = arr.map(function(item,index){
                return '<b>'+(index+1)+':'+item+'</b>'
            })
            console.log(arr2);

            //对象api
            var obj = {
                x:100,
                y:200,
                z:300
            }
            var key;
            for(key in obj){
                //hasOwnProperty:判断是否是定义的对象自身的属性，而不是继承的
                if(obj.hasOwnProperty(key)){
                    console.log(key,obj[key])
                }
            }
        },
        webApi(){
            // 常说的js（浏览器执行的js）包含两部分：js基础知识（ECMA262标准）和js-web-api（w3c标准）
            //js基础知识：1.变量类型和计算  2.原型和原型链 3.闭包和作用域 4.其他api （基于ECMA262标准）
            //js-web-api：w3c标准（不管变量类型、原型、作用域、异步）
            //js内置的全局函数和对象
            //window document navigator
            //q1：DOM是那种基本的数据结构
            //q2：DOM操作的常用api有哪些 
            //q3：DOM元素的attribute和property有何区别
            //attribute:对html
            var div1 = document.getElementById('div1');//元素
            var divlist = document.getElementsByTagName('div');//集合
            var containerlist = document.getElementsByClassName('.container')//集合
            var plist = document.querySelectorAll('p');
            console.log(plist[0]);
            //DOM结构操作 
            // 1.新增节点 
            // 1）createElement
            // 2）appendChild()
            // 2.获取父元素  （递归：自身循环的过程）
            // parentElement();
            // 3.获取子元素 
            // childNodes();
            // 4.删除节点
            // removeChild();

            //git常用命令
            //git add .
            //git checkout xxx //还原
            //git commit -m "xxx" //本地仓库
            //git push origin master//提交到远程仓库
            //git pull origin master//拉代码
            //git branch 分支
            //git checkout -b xxx //新建分支
            //git checkout xxx //切换分支
            //git merge xxx 合并分支
            //git status //查看更改的文件
            //git diff //查看新增
            //git clone
            //看到7-6
        }
        
	},
	data() {
		return {
     
		}
	}
}
</script>