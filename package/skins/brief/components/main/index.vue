<template>
  <div class="mu-main">
    <mu-menu />
    <div class="mu-content">
      <div class="mu-content_wrapper">
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
      <div class="mu-footer">Copyright © 2021 17MKH, All rights reserved.</div>
    </div>
  </div>
</template>
<style lang="scss"></style>
