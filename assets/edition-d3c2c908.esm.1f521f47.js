import{S as l,C as m,_ as t,b as s,a as g,p as y,c as w,d as W,e as C,f as v,k as f,G as T,h as A,l as S,m as b,q as E,E as R,n as B,o as F,A as M,T as O}from"./index.4a2c1a5c.js";class c extends l{constructor(r,e,i){let o=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},p=arguments.length>4?arguments[4]:void 0,h=arguments.length>5?arguments[5]:void 0,d=arguments.length>6&&arguments[6]!==void 0?arguments[6]:new m(r,e,p,o);super(d,i,h),t(this,"abi",void 0),t(this,"metadata",void 0),t(this,"app",void 0),t(this,"roles",void 0),t(this,"sales",void 0),t(this,"platformFees",void 0),t(this,"encoder",void 0),t(this,"estimator",void 0),t(this,"events",void 0),t(this,"royalties",void 0),t(this,"signature",void 0),t(this,"interceptor",void 0),t(this,"erc1155",void 0),t(this,"owner",void 0),t(this,"mint",s(async a=>this.erc1155.mint.prepare(a))),t(this,"mintTo",s(async(a,n)=>this.erc1155.mintTo.prepare(a,n))),t(this,"mintAdditionalSupply",s(async(a,n)=>this.erc1155.mintAdditionalSupply.prepare(a,n))),t(this,"mintAdditionalSupplyTo",s(async(a,n,u)=>this.erc1155.mintAdditionalSupplyTo.prepare(a,n,u))),t(this,"mintBatch",s(async a=>this.erc1155.mintBatch.prepare(a))),t(this,"mintBatchTo",s(async(a,n)=>this.erc1155.mintBatchTo.prepare(a,n))),t(this,"burn",s(async(a,n)=>this.erc1155.burn.prepare(a,n))),this.abi=p,this.metadata=new g(this.contractWrapper,y,this.storage),this.app=new w(this.contractWrapper,this.metadata,this.storage),this.roles=new W(this.contractWrapper,c.contractRoles),this.royalties=new C(this.contractWrapper,this.metadata),this.sales=new v(this.contractWrapper),this.encoder=new f(this.contractWrapper),this.estimator=new T(this.contractWrapper),this.events=new A(this.contractWrapper),this.platformFees=new S(this.contractWrapper),this.interceptor=new b(this.contractWrapper),this.signature=new E(this.contractWrapper,this.storage,this.roles),this.erc1155=new R(this.contractWrapper,this.storage,h),this.owner=new B(this.contractWrapper)}onNetworkUpdated(r){this.contractWrapper.updateSignerOrProvider(r)}getAddress(){return this.contractWrapper.readContract.address}async getAll(r){return this.erc1155.getAll(r)}async getOwned(r){return this.erc1155.getOwned(r)}async getTotalCount(){return this.erc1155.totalCount()}async isTransferRestricted(){return!await this.contractWrapper.readContract.hasRole(F("transfer"),M)}async getMintTransaction(r,e){return this.erc1155.getMintTransaction(r,e)}async prepare(r,e,i){return O.fromContractWrapper({contractWrapper:this.contractWrapper,method:r,args:e,overrides:i})}async call(r){for(var e=arguments.length,i=new Array(e>1?e-1:0),o=1;o<e;o++)i[o-1]=arguments[o];return this.contractWrapper.call(r,...i)}}t(c,"contractRoles",["admin","minter","transfer"]);export{c as Edition};
