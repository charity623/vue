<template>
	<div class="container">
        <header>
            <img src="../assets/logo.png" alt="">
            <ul>
                <li><a href="/web/www/index.html#/index" target="_blank">播主</a></li>
                <li><a href="/web/www/index.html#/list" target="_blank">观看</a></li>
                <li><a href="/web/www/index.html#/contact" target="_blank">介绍</a></li>
            </ul>
            <div class="btn-header" v-if="loginUser">
                <div class="btn-upload"><a :href="'/web/www/live-new.html#/videoadmin?uid='+loginUser.uid" target="_blank"><img src="../assets/upload.png" alt=""></a></div>
                <div class="btn-notice"><a href="/web/www/live-new.html#/notice" target="_blank"><img src="../assets/attention.png" alt=""></a></div>
                <div class="btn-message"><a href="/web/www/message.html" target="_blank"><img src="../assets/message.png" alt=""></a></div>
                <div class="avatar"><img v-bind:src="loginUser.headimgurl" alt="">
                    <div class="userPanel-show">
                        <p class="logout" @click="loginOut()">注销</p>
                        <img class="avatar" v-bind:src="loginUser.headimgurl" alt="" >
                        <p class="nickname ">{{loginUser.name}}</p>
                        <div class="balance">
                            <span class="">余额：{{loginUser.balance}}元</span><span class="charge"><a href="/web/www/live-new.html#/balance" style="color:#666">充值</a></span>
                        </div>
                        <div class="message">
                            <span class="clearfix"><a href="/web/www/message.html"><img src="../assets/user_msg.png" alt=""></a></span>
                            <span class="clearfix"><a href="/web/www/live-new.html#/history"><img src="../assets/user_history.png" alt=""></a></span>
                        </div>
                        <div class="uesrMenu userMenu">
                            <div class="user_detail"><a href="/web/www/live-new.html#/user"></a></div>
                            <div class="liveApply"><a href="/web/www/live-new.html#/apply"></a></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn-header" v-else>
                <div class="avatar"><router-link :to="'/login'" target="_blank">登陆</router-link></div>
                 
            </div>
        </header>
        <div id="cnt">
            <img src="../assets/bg.png" alt="">
            <div class="cnt">
                <ul>
                    <li>
                        <p>{{num.live_record_num}}</p>
                        <p>直播数</p>
                    </li>
                    <li>
                        <p>{{num.upload_record_num}}</p>
                        <p>视频数</p>
                    </li>
                </ul>
                <ul>
                    <li>
                        <p>{{num.live_fans_num}}</p>
                        <p>粉丝数</p>
                    </li>
                    <li>
                        <p>{{num.live_like_num}}</p>
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
                <button :class="{active:liveinfo.is_focus==1}" @click="noticeUser()"></button>
                <button @click="isActive=true;"></button>
            </div>
            <ul class="tab">
                <li class="li-tab" v-for="(item,index) in tabsParam" @click="toggleTabs(index)" :class="{active:index==nowIndex}" :key="item">{{item}}</li>
            </ul>
            <div class="arrow-box">
               <!--  <img src="../assets/drop_down.png" alt="">
                <div class="arrow-btn">
                   <p>分享</p>
                   <p @click="accusation(index)">举报</p>
                </div> -->
            </div>
        </div>
        <div class="common" id="index" v-show="nowIndex===0">
        	<ul>
        		<li v-for="i in slicedRecordInfo" :key="i">
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
                    <div v-if="user.type==5">
                        <div class="liver">
                            <div class="avatar"><img v-bind:src="user.thumb" alt=""></div>
                            <h4>{{user.title}}</h4>
                            <p>{{user.description}}</p>
                            <a href="">前往直播间>></a>
                        </div>
                        <div class="otherlinks">
                            <h3>主播其他链接</h3>
                            <div class="linklist">
                                <div class="weibo"></div>
                                <div class="douban"></div>
                                <div class="taobao"></div>
                            </div>
                        </div>
                        <div class="assolivers">
                            <h3>关联主播</h3>
                            <div class="assolist" >
                                <div class="assoitem" v-for="i in assolist" :key="i">
                                    <img v-bind:src="i.headimgurl" alt="">
                                    <p>{{i.name}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="visitors">
                        <h3>访客记录</h3>
                        <div class="visitorlist" >
                            <div class="visitoritem" v-for="i in visitorlist" :key="i">
                                <img v-bind:src="i.headimgurl" alt="">
                                <p>{{i.name}}</p>
                            </div>
                        </div>
                    </div>
        				
        		</div>
        		<div class="right">
                    <div id="message">
                        <textarea id="" placeholder="趁热留下你的评论..." @focus="onFocus" v-model="text"></textarea>
                        <button @click="sendMsg()" :disabled="btnFlag">发送</button>
                    </div>     
                    <hr> 
                    <div class="msglist">
                        <div class="msgitem" v-for="(i, index) in msglist" :key="i">
                            <div class="avatar"><img v-bind:src="i.headimgurl" alt=""></div>
                            <div class="msgdetail">
                                <div class="name">{{i.name}}<span>{{publishDate(i.time)}}</span></div>
                                <div class="content">{{i.content}}</div>
                                <div class="othermsg" v-if="i.recall!=null">
                                    <p>{{i.recall.name}}</p>
                                    {{i.recall.content}}
                                </div>
                                <div class="reply">
                                    <span>#{{i.floor}}</span>
                                    <span @click="curIndex = index">回复</span>
                                </div>
                                <div class="message" v-show="index == curIndex">
                                    <textarea id="" placeholder="回复我，快~" v-model="subText"></textarea>
                                    <button @click="sendMsg(i)" :disabled="subBtnFlag">发送</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="loadmore" v-show="loadmoreMsg" @click="getMsglist()">
                        加载更多留言
                    </div>
                </div>
        	</div>
        </div> 
        <div class="common" id="videolist" v-show="nowIndex===1">
            <ul>
                <li v-for="i in recordlist" :key="i">
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
            <div class="loadmoreVideo" v-show="loadmoreVideo" @click="getRecordlist()">
                加载更多
            </div>
        </div>
        <div class="common" id="userdetail" v-show="nowIndex===2">
           <div class="userPanel">
               <h4>资本资料</h4>
               <ul>
                   <li>
                       <span>用户名</span><span>{{user.name}}</span>
                   </li>
                   <li>
                       <span>性别</span>
                         <!--  性别 0：女  1：男 2：未知 -->
                       <span v-if="user.sex==0">
                       女
                       </span>
                       <span v-if="user.sex==1">
                      男
                       </span>
                       <span v-if="user.sex==2">
                      未知
                       </span>
                   </li>
                   <li>
                       <span>签名</span>
                       <span v-if="user.sign==null">无</span>
                       <span v-if="user.sign!=null">user.sign</span>
                   </li>
                   <li>
                       <span>生日</span>
                        <span v-if="user.born==null">无</span>
                       <span v-if="user.born!=null">user.born</span>
                   </li>
                   <li>
                       <span>现居</span>
                           <span v-if="user.address==null">无</span>
                       <span v-if="user.address!=null">user.address</span>
                   </li>
                   <li>
                       <span>创建于</span><span>{{user.created_at}}</span>
                   </li>
               </ul>
           </div>
        </div>
        <footer>
            <div class="top">
                <img src="../assets/blurb.png" alt="">
                <ul>
                    <h4>联系我们</h4>
                    <li><a href="">项目/职位咨询：markmo@tianyantv.com</a></li>
                    <li><a href="">内容、品牌合作：hefan@tianyantv.com</a></li>
                    <li><a href="">产品建议/问题反馈：chengyuan@tianyantv.com</a></li>
                </ul>
                <ul>
                    <h4>常见问题</h4>
                    <li><a href="">如何成为主播</a></li>
                    <li><a href="">如何开播</a></li>
                    <li><a href="">其他使用问题</a></li>
                </ul>
            </div>
            <p></p>
            <div class="bottom">
                <a href="http://weibo.com/u/5815791757?refer_flag=1001030001_&amp;nick=%E5%A4%A9%E7%9C%BC%E9%80%9A%E8%A7%86%E9%A2%91&amp;is_hot=1"><img src="../assets/weibo_list.png" alt=""></a>
                <p>Copyright&nbsp;2015-2017&nbsp;天眼通&nbsp;All Rights Reserved &gt;京ICP备16002486号</p>
            </div>
        </footer>
        <div class="mask" v-bind:class="{ show: isActive }">
            <div class="panel msgPanel">
                <div class="close" @click="isActive=false"></div>
                <h3>发送私信</h3>
                <textarea name="" id="" cols="30" rows="10" placeholder="发送私信" v-model="content"></textarea>
                <button @click="sendPrivate(content)">发送</button>
            </div>
        </div>
        
    </div>
</template>

<style scoped>
.show{display: block!important;}
.mask{width:100%;height:100%;background:rgba(0,0,0,.4);position: fixed;top:0;left:0;z-index: 2;display: none;}
.panel{border-radius: 5px;background: #fff;position:fixed;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);z-index: 3;}
.panel.msgPanel{width:562px;/*height:428px;*/}
.msgPanel h3{margin:40px auto 44px;text-align: center;font-size: 30px; color:#666;}
.msgPanel textarea{width:450px;height:160px;background:#fbfbfb;border:1px solid #dcdcdc;border-radius: 5px;font-size: 22px;color:#999;text-indent: 10px;padding:10px;resize:none;outline: none;}
.msgPanel button{margin:36px auto 40px;width:470px;height:60px;border-radius: 5px;background: #e3e3e3;border:0;cursor: pointer;color:#fff;font-size: 26px;}
.msgPanel button:hover{background:#999;}
.msgPanel .close{background:url(../assets/off.png) 0 0 no-repeat;width:26px;height:26px;position:absolute;top:42px;right:50px;cursor: pointer;}
.msgPanel .close:hover{background:url(../assets/off.png) 0 -26px no-repeat;}
    .arrow-box{position: absolute;top: 0;right: 20%;}
    .arrow-box:hover>div{display: block;}
    .arrow-box>img{float: right;}
    .arrow-btn{width:136px;background:#fff;border-radius: 5px;display: none;margin-top:40px;}
    .arrow-btn>p{padding-top:18px;padding-bottom:18px;font-size: 20px;color:#666;text-align:center;cursor: pointer;}
    .loadmore{width:100%;height:74px;border-top:1px solid #ededed;line-height: 74px;font-size: 16px;color:#333;cursor: pointer;}
    .loadmoreVideo{width:100%;margin:42px auto 58px;color:#666;font-size: 24px;cursor: pointer;}
	ul,
	li{list-style:none;float:left;}
	a{text-decoration:none;color:#fff;}
	.container{min-width:1200px;}
	header{height:70px;background:#333;}
	header ul{float:none;font-size:22px;width:465px;margin: auto}
	header ul li{float:left;padding:0 55px;line-height:70px;color:#fff;}
    header>img{width: 130px;height: 37px;position: absolute;left: 100px;margin-top: 16px;}
    .btn-header{position: absolute;right:100px;margin-top:15px;}
    .btn-header>div{display: inline-block;width:40px;height:40px;margin-left: 40px;cursor: pointer;}
    .btn-header>div>img{width:100%;height:100%;border-radius: 50%;}
    .btn-header>div.avatar{background: #fff;color:#333;font-size: 10px;line-height: 40px;text-align: center;border-radius: 50%;}
	.btn-header .avatar:hover .userPanel-show{display: block;}
    #cnt{position:relative;font-size:0;}
	#cnt img{width:100%;}
	#cnt .cnt{width:1200px;position:absolute;bottom:14px;left:50%;transform:translateX(-50%);}
	#cnt .cnt ul{width:40%;color:#000;font-size:20px;}
	#cnt .cnt ul:nth-child(1){float: left}
	#cnt .cnt ul:nth-child(2){float: right}
	/* #cnt .cnt ul:nth-child(1) li{} */
	/* #cnt .cnt ul:nth-child(2) li{} */
	#cnt .cnt li{width:50%;text-align:center;display:inline-block;}
	#cnt .avatar{z-index:1;width:170px;height:170px;background:#999;border-radius:100%;position:absolute;bottom:-90px;left:50%;transform:translateX(-50%);box-shadow:4px 0 30px rgba(51,51,51,.25)}
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

    #detail .btn button.active{background:url(../assets/concern.png) 0 0px no-repeat;}
    #detail .btn button.active:hover{background:url(../assets/concern.png) 0 -50px no-repeat;}
	#detail .tab{box-shadow:4px 0 30px rgba(51,51,51,.25);position:absolute;left:50%;transform:translateX(-50%);width:768px;height:64px;background:#f4f4f4;border-radius:10px;bottom:-32px;}
	#detail .tab li{width:33%;text-align:center;line-height:64px;font-size:24px;color:#999;cursor:pointer;}
	#detail .tab li.active{color:#4b494c;}
	.common{width:1080px;margin:84px auto;padding-bottom:100px;overflow: hidden;}
	#index ul,#videolist ul{margin-bottom:40px;}
	#index li,#videolist li{width:240px;height:268px;background:#fff;box-shadow:2px 0 21px rgba(100,108,206,.24);margin-right:28px;margin-bottom:20px;border-radius: 2px;}
	#index li .thumb,#videolist li .thumb{width:100%;height:130px;background:#999;position:relative;}
    #index li .thumb img,#videolist li .thumb img{width:100%;height:100%;}
	#index li .thumb>span,#videolist li .thumb>span{position:absolute;bottom:6px;right:8px;background:#666;display:inline-block;font-size:12px;height:18px;line-height:18px;padding:0 5px;border-radius:3px;}
	#index li h3,#videolist li h3{font-size:19px;color:#333;height:80px;text-align:center;padding: 26px 20px 0;}
	#index li p,#videolist li p{background:url(../assets/good2.png) 80px center no-repeat;background-size:12px 10px;font-size:16px;color:#999;text-align:center;}
	.others .left{width:340px;margin-right:20px;float: left;}
	.others .left .liver{width:100%;min-height:350px;background:#fff;box-shadow:2px 0 21px rgba(100,108,206,.24);margin-bottom:22px;padding-top:30px;}
	.others .left .liver>.avatar{margin:0 auto 22px;width:280px;height:154px;background:#999;border-radius: 10px;}
    .others .left .liver>.avatar img{width:100%;height:100%;border-radius: 10px;}
	.others .left .liver>h4{font-size: 18px;color:#333;font-weight: normal;margin-bottom:30px;padding-left:30px;}
	.others .left .liver>p{font-size: 16px;color:#666;font-weight: normal;margin-bottom:38px;padding-left:30px;}
	.others .left .liver>a{font-size: 16px;color:#333;font-weight: normal;margin-bottom:20px;padding-right:30px;float: right;}
	.others .left .otherlinks{width:100%;height:178px;background:#fff;box-shadow:2px 0 21px rgba(100,108,206,.24);margin-bottom:28px;}
	.others .left .otherlinks>h3{font-size: 16px;color:#333;margin:0 auto 36px;padding-top:20px;font-weight:bold;} 
    .others .left .otherlinks .linklist{width:264px;margin:0 auto;overflow: hidden;}
    .others .left .otherlinks .linklist>div{width:60px;height:60px;float: left;margin-right:42px;}
    .others .left .otherlinks .linklist>div.weibo{background:url(../assets/weibo.png) 0 0 no-repeat;}
    .others .left .otherlinks .linklist>div.douban{background:url(../assets/douban.png) 0 0px no-repeat;}
    .others .left .otherlinks .linklist>div.taobao{margin:0;background:url(../assets/taobao.png) 0 0px no-repeat;}
	.others .left .assolivers{background:#fff;box-shadow:2px 0 21px rgba(100,108,206,.24);margin-bottom:28px;}
    .others .left .assolivers .assolist{width:318px;padding:20px 11px 0;overflow: hidden;}
    .others .left .assolivers >h3{font-size: 16px;color:#333;margin:0 auto;padding-top:20px;font-weight:bold;} 
    .others .left .assolivers .assolist .assoitem{width:62px;margin:0 19px 18px;float: left;}
    .others .left .assolivers .assolist .assoitem img{width:62px;height:62px;border-radius: 100%;background:#999;}
    .others .left .assolivers .assolist .assoitem p{font-size: 16px;color:#666;text-align: center;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
    .others .left .visitors{background:#fff;box-shadow:2px 0 21px rgba(100,108,206,.24);margin-bottom:28px;}
    .others .left .visitors h3{font-size: 16px;color:#333;font-weight: bold;padding-top:20px;padding-left:30px;text-align: left;}
    .others .left .visitors .visitorlist{width:304px;padding:20px 17px 0;overflow: hidden;}
    .others .left .visitors .visitoritem{width:50px;margin:0px 13px 22px;float: left;}
    .others .left .visitors .visitoritem img{width:50px;height:50px;background:#999;border-radius: 100%;}
    .others .left .visitors .visitoritem p{font-size: 13px;color:#666;}
	.others .right{float: left;width:680px;box-shadow:2px 0 21px rgba(100,108,206,.24);background:#fff;min-height:100px;}
    .others .right #message{width:600px;margin:0 auto;overflow: hidden;}
    .others .right  textarea{width:99%;height:74px;border:1px solid #d6d6d6;border-radius: 5px;margin-top:19px;resize:none;padding-top: 10px;text-indent: 14px;margin-bottom:10px;font-size: 16px;color:#999;}
    .others .right button{float: right;width:50px;height:22px;background:#666;color:#fff;outline: none;border:0;border-radius: 2px;font-size: 12px;margin-bottom:10px;}
    .others .right hr{    height: 1px;background: #f4f4f4;border: 0;}
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
    .userPanel{width:698px;background:#fff;box-shadow:2px 0 21px rgba(100,108,206,.24);border-radius: 2px;margin:0 auto;padding-left:70px;overflow: hidden;}
    .userPanel h4{font-size: 18px;color:#333;text-align: left;padding-top:32px;margin-bottom:72px;font-weight: bold;}
    .userPanel ul{width: 100%;margin-bottom:40px;}
    .userPanel li{float:none;font-size: 18px;color:#333;text-align: left;margin-bottom:32px;}
    .userPanel li span:nth-child(1){width:112px;text-align: left;display: inline-block;}
     footer{width:100%;background:#fff;margin-top:30px;}
     footer>div{width:1200px;margin:0 auto;}
     footer .top{height:174px;}
     footer .top img{margin-top:20px;margin-right:72px;}
     footer .top ul{float:right;margin-top:40px;}
     footer .top ul:nth-child(3){margin-right:100px;}
     footer .top ul h4{font-size:15px;color:#333;margin-bottom:12px;text-align: left;}
     footer .top ul li{font-size:14px;color:#999;margin-bottom:6px;float: none;text-align: left;}
     footer .top ul li a{color:#999;}
     footer>p{height:1px;background:#e0e0e0;width:100%;}
     footer .bottom{height:35px;}
     footer .bottom a{width:20px;height:17px;float: left;margin-left: 135px;}
     footer .bottom img{width:20px;height:17px;margin-top:8px;}
     footer .bottom p{float:right;line-height:35px;display:inline-block;font-size:12px;color:#666;}

    .userPanel-show{display:none;position:absolute;right:0;top:49px;width:300px;height:344px;line-height:1;text-align:center;font-size:14px;color:#666;background-color:#fff;border:1px solid #ccc;border-radius:5px;-webkit-background-size:100% 100%;background-size:100% 100%;    z-index: 1;}
    .userPanel-show:before{border:7px solid transparent;border-bottom-color:#cfcfcf}
    .userPanel-show:after,
    .userPanel-show:before{content:'';position:absolute;right:12px;top:-14px;}
    .userPanel-show:after{margin-top:1px;border:7px solid transparent;border-bottom-color:#fff}
    .userPanel-show>*{margin-bottom:12px;}
    .userPanel-show>p.logout{position:absolute;right:0;top:0;line-height:60px;margin-right:20px;cursor:pointer;}
    .userPanel-show>img.avatar{width:100px;height:100px;border-radius:50%;margin:40px 0 10px 0;}
    .userPanel-show>div.balance>span{display:inline-block;vertical-align:middle;}
    .userPanel-show>div.balance>span.charge{font-size:12px;border:1px solid #666;border-radius:2px;margin-left:10px;padding:1px;cursor:pointer;}
    .userPanel-show .message>span{display:inline-block;vertical-align:middle;padding:0 6px;cursor:pointer;}
    .uesrMenu{height:105px;line-height:105px;font-size:0;}
    .uesrMenu>div{display:inline-block;width:33.33%;height:60px;vertical-align:middle;border-right:2px solid #e6e6e6;cursor:pointer;}
    .uesrMenu>div:nth-child(3){border:none;}
    .uesrMenu>div.user_detail{background:url(../assets/user_detail.png) center no-repeat;}
    .uesrMenu>div.user_detail:active,
    .uesrMenu>div.user_detail:hover{background:url(../assets/user_detail_press.png) center no-repeat;}
    .uesrMenu>div.liveSet{background:url(../assets/liveSet.png) center no-repeat;}
    .uesrMenu>div.liveSet:active,
    .uesrMenu>div.liveSet:hover{background:url(../assets/liveSet_press.png) center no-repeat;}
    .uesrMenu>div.myRoom{background:url(../assets/myRoom.png) center no-repeat;}
    .uesrMenu>div.myRoom:active,
    .uesrMenu>div.myRoom:hover{background:url(../assets/myRoom_press.png) center no-repeat;}
    .uesrMenu>div.liveApply{background:url(../assets/user_apply.png) center no-repeat;}
    .uesrMenu>div.liveApply:active,
    .uesrMenu>div.liveApply:hover{background:url(../assets/user_apply_press.png) center no-repeat;}
    .charge a,
    .uesrMenu a{display:block;width:100%;height:100%;}
    .uesrMenu.userMenu>div:nth-child(2){border:none;}
    #textStyle{z-index:9999;border-radius:10px;height:90px;line-height:90px;position:fixed;left:50%;padding:0 30px;font-size:26px;color:#fff;background:rgba(51,51,51,.9);top:50%;transform:translate(-50%,-50%);}

</style>

<script>
import { userinfo, recordlist, msglist, sendmsg,addVisitorhis,getAssocbylid,getVisitorhis,getLoginUserinfo,livedetail,noticeUser,sendPrivate} from '@/utils/http'
import { mapState, mapActions } from 'vuex'
import Tool from "../utils/Tool"

export default {
	created() {
		this.init();
		this.getMsglist();
        this.getRecordlist();
        console.log(id())
	},
	mounted() {
		// console.log(Tool.localItem("token","eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI4NSwiaXNzIjoiaHR0cDpcL1wvd3d3LnRpYW55YW50di5jb21cL2dldHRva2VuIiwiaWF0IjoxNTA5NjA5NTI4LCJleHAiOjE1MDk4Njg3MjgsIm5iZiI6MTUwOTYwOTUyOCwianRpIjoiZTAxNzRiNDJmNzE0ZjY1OTBkNzUyYTc3NjA0YmMwNTUifQ.JUfXcoc25PlIoq3B4J1T4L9rqyH5rp0T2EJgXshwjIM"))
	},
	computed: {
		...mapState({
			route: state => state.route,
		}),
		btnFlag(){
			return this.text.trim().length == 0;
        },
		subBtnFlag(){
			return this.subText.trim().length == 0;
        },
        slicedRecordInfo(){
            return this.recordinfo.slice(0,8)
        },
        id(){
            return this.route.params.id;
        }
	},
	methods: {
		async init() {
            //获取视频列表
			const res = await recordlist({ 'uid': this.id })
            this.recordinfo = res.data;
            this.num = res.num;
            //获取用户信息
			const res2 = await userinfo('/user/detail/' + this.id)();
			this.user = res2.data;
            // console.log(this.user.type)
            //关联主播列表
            const res4 = await getAssocbylid({ 'uid': this.id })
            this.assolist = res4.data;
            //添加访客记录
            const res3 = await addVisitorhis({ 'liveuid': this.id}, Tool.localItem('token'));
            //获取访客列表
            const res5 = await getVisitorhis({ 'liveuid': this.id,size:32 })
            this.visitorlist = res5.data;

            const res6 = await getLoginUserinfo({}, Tool.localItem('token'));
            this.loginUser = res6.data;

            const res7 = await livedetail({'liverid':this.user.id}, Tool.localItem('token'));
            this.liveinfo = res7.data;

		},
		async getMsglist() {
            const res = await msglist({ 'liveuid': this.id,'offset':this.recordOffset}, Tool.localItem('token'));
            const newmsglist = res.data;
            if(this.recordOffset == 0){
                this.msglist = newmsglist
            }else{
                for (var i = 0; i < res.data.length; i++) {
                    this.msglist.push(newmsglist[i]);
                }
            }
            if(res.data.length==10){
                this.recordOffset++;
                this.loadmoreMsg = true;
            } else {
                this.loadmoreMsg = false;
            }
		},
        async getRecordlist() {
            const res = await recordlist({ 'uid': this.id ,size:12,'offset':this.videoOffset})

            this.newrecordlist = res.data;

            for (var i = 0; i < res.data.length; i++) {
                 this.recordlist.push(this.newrecordlist[i]);
            }
            if(res.data.length==12){
                this.videoOffset++;
                this.loadmoreVideo = true;
            } else {
                this.loadmoreVideo = false;
            }

        },
		async sendMsg(i) {
            // console.log(arguments.length)
            let msgObj= {
                'liveuid': this.id,
                'content': this.text.trim()
            }
            if(arguments.length != 0){
                msgObj.with = i.id;
                msgObj.content = this.subText.trim();
            }
			if (msgObj.content == '') return false;
			this.btnFlag = true;
			const res = await sendmsg(msgObj, Tool.localItem('token'))
			if (res.error != 0) {
				this.btnFlag = false;
                if(res.error==999){
                    Tool.text("请登录");
                }
			}else{
                this.text = ''
                this.recordOffset = 0;
				this.getMsglist();
                this.curIndex = -1;
			}
		},
       
        async  noticeUser() {
            if(!this.loginUser){
                alert("请登录");
                return false
            }
            const res = await  noticeUser({'liverid':this.user.id},Tool.localItem('token'))
            if(res.error==0){
                if(this.liveinfo.is_focus==1){
                    this.liveinfo.is_focus = 0;
                } else {
                    this.liveinfo.is_focus = 1;
                }
            } else if(res.data==999){
                alert("请登录");
            }
        },
        async sendPrivate(content){
            const res = await  sendPrivate({'touser':this.id,'content':content},Tool.localItem('token'))
            if(res.data==0){
                alert("发送成功");
                this.isActive=false;
            } else if(res.data==999){
                alert("请登录")
            }

        },
        toggleTabs(index){
            this.nowIndex=index;
        },
        publishDate(time){
            return Tool.getTheTime(parseInt(time));
        },
        onFocus(){
            this.curIndex = -1;
        },
        loginOut(){
            Tool.removeLocalItem("token");
            window.location.reload();
        }
	},
	data() {
		return {
            recordinfo: [],
            num: {},
			user: {},
			text: '',
			subText: '',
			msglist: [],
            tabsParam:['主页','视频','资料'],//（这个也可以用对象key，value来实现）
            nowIndex:0,//默认第一个tab为激活状态
            curIndex: -1,
            recordOffset:0,
            assolist:{},
            visitorlist:{},
            recordlist:[],
            loadmoreMsg:false,
            loadmoreVideo:false,
            videoOffset:0,
            newrecordlist:[],
            loginUser:{},
            liveinfo:{},
            isActive:false,
            content:''
		}
	}
}
</script>