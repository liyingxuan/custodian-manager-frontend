<!--
  - /***************************************************************************************
  - * Copyright © 2014-2018 Ontology Foundation Ltd.
  - * All rights reserved.
  - *
  - * This software is supplied only under the terms of a license agreement,
  - * nondisclosure agreement or other written agreement with Ontology Foundation Ltd.
  - * Use, redistribution or other disclosure of any parts of this
  - * software is prohibited except in accordance with the terms of such written
  - * agreement with Ontology Foundation Ltd. This software is confidential
  - * and proprietary information of Ontology Foundation Ltd.
  - *
  - ****************************************************************************************/
  -
  -->

<template>
  <div class="navBarNotLogin" mode>
    <svg-icon class="bandNotLogin" iconClass="band-logo"/>
  </div>
</template>

<script>
export default {};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../styles/variables.scss";

.navBarNotLogin {
  display: flex;
  flex-direction: row;
  min-width: 1240px;
}

.bandNotLogin {
  margin: 15px;
  width: 154px;
  height: 64px;
}
</style>
