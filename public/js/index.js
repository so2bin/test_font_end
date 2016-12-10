/**
 * Created by duoyi on 16-12-10.
 */
// const router = require('../route-config.js');
// console.log(router);
'use strict';
$(function () {

  const Foo = {template: '<div>foo</div>'};
  const Bar = {template: '<div>bar</div>'};
  const User = {
    template: `<div>
    <h2>User {{ $route.params.id }}</h2>
    <router-view></router-view>
    </div>
    `
  };
  const UserHome = { template: '<div>Home</div>' };
  const UserProfile = { template: '<div>Profile</div>'};
  const UserPosts = { template: '<div>Posts</div>' };

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
  const routes = [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: User
      }
    },
    {
      path: '/other',
      components: {
        default: User,
        a: Bar,
        b: Foo
      }
    },
  ];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
  const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
  });

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
  const app = new Vue({
    router
  }).$mount('#app');

// 现在，应用已经启动了！

});