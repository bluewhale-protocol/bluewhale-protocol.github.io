(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{x4gY:function(t,e,n){"use strict";n.r(e),n.d(e,"DevPageModule",function(){return k});var s=n("zaZD"),i=n("ofXK"),o=n("3Pt+"),r=n("TEn/"),a=n("tyNb"),c=n("mrSG"),d=n("JxOG"),u=n("GYP7"),h=n("f+iR"),l=n("fXoL"),b=n("+lXL"),f=n("OF6Y"),p=n("25rU"),v=n("4vFI"),m=n("RjTH");const w=[{path:"",component:(()=>{class t{constructor(t,e,n,s,i){this.globalService=t,this.dataService=e,this.interfaceService=n,this.walletService=s,this.tokenService=i,this.C=h,this.Unit=d.a,this.Time=u.a,this.globalService.title="\ud14c\uc2a4\ud2b8",this.tokenAddress="",this.toAddress="",this.amount=""}ngAfterViewInit(){EasyLiteApp.init()}ngOnDestroy(){}transfer(){return Object(c.a)(this,void 0,void 0,function*(){console.log(`tokenAddress : ${this.tokenAddress}\ntoAddress: ${this.toAddress}\namount: ${this.amount}`),yield this.walletService.sendToken(this.tokenAddress,this.toAddress,this.amount)})}}return t.\u0275fac=function(e){return new(e||t)(l.Hb(b.a),l.Hb(f.a),l.Hb(p.a),l.Hb(v.a),l.Hb(m.a))},t.\u0275cmp=l.Bb({type:t,selectors:[["route-dev"]],decls:1,vars:0,template:function(t,e){1&t&&l.rc(0,"ok\n")},encapsulation:2}),t})()}];let A=(()=>{class t{}return t.\u0275mod=l.Fb({type:t}),t.\u0275inj=l.Eb({factory:function(e){return new(e||t)},imports:[[a.j.forChild(w)],a.j]}),t})(),k=(()=>{class t{}return t.\u0275mod=l.Fb({type:t}),t.\u0275inj=l.Eb({factory:function(e){return new(e||t)},imports:[[s.a,i.b,o.d,r.a,A]]}),t})()}}]);