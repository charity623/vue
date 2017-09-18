<template>
	<div class="container">
        <header>
            <ul>
                <li><a href="">播主</a></li>
                <li><a href="">观看</a></li>
                <li><a href="">介绍</a></li>
            </ul>
        </header>
        <div id="cnt">
            <img src="../assets/bg.png" alt="">
            <div class="cnt">
                <ul>
                    <li>
                        <p>{{recordinfo.live_record_num}}</p>
                        <p>直播数</p>
                    </li>
                    <li>
                        <p>{{recordinfo.upload_record_num}}</p>
                        <p>视频数</p>
                    </li>
                </ul>
                <ul>
                    <li>
                        <p>818</p>
                        <p>粉丝数</p>
                    </li>
                    <li>
                        <p>666666</p>
                        <p>点赞数</p>
                    </li>
                </ul>
            </div>
            <div class="avatar">
                <img v-bind:src="user.headimgurl" alt="">
            </div>
        </div>
        <div id="detail">
            <h3>{{user.name}}</h3>
            <h4>ta只想安静的做一个路人，所以没有填写签名</h4>
            <div class="btn">
                <button></button>
                <button></button>
            </div>
            <ul class="tab">
                <li class="active">主页</li>
                <li>视频</li>
                <li>资料</li>
            </ul>
        </div>
        <div id="index">
        	<ul>
        		<li v-for="i in recordinfo">
        			<a href="">
        				<div class="thumb">
        					<img v-bind:src="i.record_pic" alt="">
        					<span>{{i.duration}}</span>
        				</div>
        				<h3>{{i.title}}</h3>
        				<p>{{i.like}}</p>
        			</a>
        		</li>
        	</ul>
        	<div class="others">
        		<div class="left">
        				<div class="liver">
        					<div class="avatar"><img src="" alt=""></div>
        					<h4>病毒猎人同人小说</h4>
        					<p>玩的666666666666</p>
        					<a href="">前往直播间>></a>
        				</div>
        				<div class="otherlinks">
        					<h3>主播其他链接</h3>
                            <div>
                                <div><img src="" alt=""></div>
                                <div><img src="" alt=""></div>
                                <div><img src="" alt=""></div>
                            </div>
        				</div>
        				<div class="assolivers"></div>
        		</div>
        		<div class="right">
                    <div id="message">
                        <textarea id="" placeholder="趁热留下你的评论..." v-model="text"></textarea>
                        <button @click="sendMsg()">发送</button>
                    </div>     
                    <hr> 
                    <div class="msglist">
                        <div class="msgitem" v-for="i in msglist">
                            <div class="avatar"><img v-bind:src="i.headimgurl" alt=""></div>
                            <div class="msgdetail">
                                <div class="name">{{i.name}}<span>刚刚</span></div>
                                <div class="content">{{i.content}}</div>
                                <div class="othermsg">
                                    <p>筱雨起</p>
                                    对了那个web还有几个超级复杂的动效要加，看到麻烦回复一下
                                </div>
                                <div class="reply">
                                    <span>#{{i.floor}}</span>
                                    <span>回复</span>
                                </div>
                                <div class="message">
                                    <textarea id="" placeholder="回复我，快~"></textarea>
                                    <button>发送</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        	</div>
        </div> 
    </div>
</template>

<style scoped>
    .msgitem{margin:20px 20px 38px 46px;}
    .msgitem .avatar{float:left;width:62px;height:62px;background: #999;border-radius: 100%;margin-right:30px;}
    .msgitem .avatar img{width:100%;height:100%;border-radius: 100%;}
    .msgitem .msgdetail{width:80%;}
    .msgdetail>div{text-align: left;}
    .msgdetail .name{font-size: 16px;color:#666;margin-bottom: 16px;}
    .msgdetail .name span{color:#999;margin-left:16px;}
    .msgdetail .content{font-size: 16px;color:#999;margin-bottom: 10px;}
    .msgdetail .othermsg{font-size: 16px;color:#999;margin-bottom: 12px;background:#f4f4f4;margin-left: 92px;padding:12px 24px 16px 16px;border-radius: 2px;}
    .msgdetail .othermsg p{color:#666;margin-bottom: 12px;}
    .msgdetail .reply,.msgdetail .message{margin-left:92px;}
    /* .msgdetail .reply span:nth-child(1){} */
    .msgdetail .reply span:nth-child(2){float: right}
	ul,
	li{list-style:none;float:left;}
	a{text-decoration:none;color:#fff;}
	.container{min-width:1200px;}
	header{height:70px;background:#333;}
	header ul{float:left;font-size:22px;}
	header ul li{float:left;margin-left:110px;line-height:70px;color:fff;}
	#cnt{position:relative;font-size:0;}
	#cnt img{width:100%;}
	#cnt .cnt{width:1200px;position:absolute;bottom:14px;left:50%;transform:translateX(-50%);}
	#cnt .cnt ul{width:50%;color:#000;font-size:20px;}
	/* #cnt .cnt ul:nth-child(1) li{} */
	/* #cnt .cnt ul:nth-child(2) li{} */
	#cnt .cnt li{width:50%;text-align:center;display:inline-block;}
	#cnt .avatar{z-index:1;width:216px;height:216px;background:#999;border-radius:100%;position:absolute;bottom:-108px;left:50%;transform:translateX(-50%);box-shadow:4px 0 30px rgba(51,51,51,.25)}
    #cnt .avatar img{width: 100%; height: 100%;border-radius: 100%;}
	#detail{position:relative;height:266px;width:100%;background:#4b494c;padding-top:140px;}
	#detail h4,
	#detail h3{text-align:center}
	#detail h3{font-size:30px;color:#fff;margin-bottom:16px;}
	#detail h4{font-size:22px;color:#9e9e9e;margin-bottom:38px;}
	#detail .btn{width:322px;margin:0 auto;height:50px;}
	#detail .btn button{background:url(../assets/notice.png) 0 0 no-repeat;height:100%;width:140px;outline:none;border:0;float:left;cursor:pointer;}
	#detail .btn button:nth-child(2){background:url(../assets/private.png) 0 0 no-repeat;margin-left:42px;}
	#detail .btn button:nth-child(1):hover{background:url(../assets/notice.png) 0 -50px no-repeat;}
	#detail .btn button:nth-child(2):hover{background:url(../assets/private.png) 0 -50px no-repeat;}
	#detail .tab{box-shadow:4px 0 30px rgba(51,51,51,.25);position:absolute;left:50%;transform:translateX(-50%);width:768px;height:64px;background:#f4f4f4;border-radius:10px;bottom:-32px;}
	#detail .tab li{width:33%;text-align:center;line-height:64px;font-size:24px;color:#999;cursor:pointer;}
	#detail .tab li.active{color:#4b494c;}
	#index{width:1080px;margin:84px auto;padding-bottom:100px;overflow: hidden;}
	#index ul{margin-bottom:40px;}
	#index li{width:240px;height:268px;background:#fff;box-shadow:2px 0 21px rgba(100,108,206,.24);margin-right:28px;margin-bottom:20px;border-radius: 2px;}
	#index li .thumb{width:100%;height:130px;background:#999;position:relative;}
    #index li .thumb img{width:100%;height:100%;}
	#index li .thumb>span{position:absolute;bottom:6px;right:8px;background:#666;display:inline-block;font-size:12px;height:18px;line-height:18px;padding:0 5px;border-radius:3px;}
	#index li h3{font-size:19px;color:#333;height:80px;padding-top:26px;text-align:center;}
	#index li p{background:url(../assets/good2.png) 80px center no-repeat;background-size:12px 10px;font-size:16px;color:#999;text-align:center;}
	.others .left{width:340px;margin-right:20px;float: left;}
	.others .left .liver{width:100%;min-height:350px;background:#fff;box-shadow:2px 0 21px rgba(100,108,206,.24);margin-bottom:22px;padding-top:30px;}
	.others .left .liver>.avatar{margin:0 auto 22px;width:280px;height:154px;background:#999;border-radius: 10px;}
	.others .left .liver>h4{font-size: 18px;color:#333;font-weight: normal;margin-bottom:30px;padding-left:30px;}
	.others .left .liver>p{font-size: 16px;color:#666;font-weight: normal;margin-bottom:38px;padding-left:30px;}
	.others .left .liver>a{font-size: 16px;color:#333;font-weight: normal;margin-bottom:20px;padding-right:30px;float: right;}
	.others .left .otherlinks{width:100%;height:178px;background:#fff;box-shadow:2px 0 21px rgba(100,108,206,.24);margin-bottom:28px;}
	/* .others .left .otherlinks>h3{} */
	.others .left .assolivers{width:100%;height:288px;background:#fff;box-shadow:2px 0 21px rgba(100,108,206,.24);}
	.others .right{float: left;width:680px;box-shadow:2px 0 21px rgba(100,108,206,.24);background:#fff;min-height:100px;}
    .others .right #message{width:600px;margin:0 auto;overflow: hidden;}
    .others .right  textarea{width:99%;height:74px;border:1px solid #d6d6d6;border-radius: 5px;margin-top:19px;resize:none;padding-top: 10px;text-indent: 14px;margin-bottom:10px;font-size: 16px;color:#999;}
    .others .right button{float: right;width:50px;height:22px;background:#666;color:#fff;outline: none;border:0;border-radius: 2px;font-size: 12px;margin-bottom:10px;}
    .others .right hr{    height: 1px;background: #f4f4f4;border: 0;}
</style>

<script>
	import { userinfo, recordlist,msglist,sendmsg } from '@/utils/http'
	import { mapState, mapActions } from 'vuex'
    import Tool from "../utils/Tool"

	export default {
		created(){
			this.getRecordlist();
            this.getuserInfo();
            this.getMsglist();
		},
		mounted(){
			// console.log(Tool.localItem("token"))
		},
		computed: {
			...mapState({
        route: state => state.route,
      }),
		},
		methods: {
			async getRecordlist() {
    	      let res = await recordlist({ 'uid': this.route.query.id })
    	    
    	      this.recordinfo = res.data;
    	    },
            async getuserInfo() {
              const res = await userinfo('/user/detail/' + this.route.query.id)();
              this.user = res.data;
            },
            async getMsglist() {
              const res = await msglist({ 'liveuid': this.route.query.id }, Tool.localItem('token'));
              this.msglist = res.data;

            },
            async sendMsg() {
              const res = await sendmsg({ 'liveuid': this.route.query.id,'content': this.text}, Tool.localItem('token'))
            }
            
		},
		data(){
			return {
				recordinfo: {},
                user:{},
                text:'',
                msglist:{}

			}
		}
	}
</script>