<template>
  <div class="detail">
    <div class="apply-body">
      <div class="left block-title">
        <span>
          <i class="el-icon-coin"></i>
          &nbsp;&nbsp;学者信息
        </span>
      </div>
      <div class="info-table">
        <el-descriptions class="margin-top" :column="2" border>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              姓名
            </template>
            {{ info.real_name }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-message"></i>
              邮箱地址
            </template>
            {{ info.work_email }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              所在机构
            </template>
            {{ info.affiliation_name }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-paperclip"></i>
              首页（可选）
            </template>
            {{ info.homepage }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-data-analysis"></i>
              领域
            </template>
            <span v-for="(field, i) in info.fields" v-bind:key="i">
              {{ field }}<span v-if="i<info.fields.length-1">, </span>
            </span>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="left block-title">
        <span>
          <i class="el-icon-document"></i>
          &nbsp;&nbsp;
          <el-tooltip effect="light" content="点击查看被认领门户详情" placement="right">
            <span class="link-sch" @click="goSchPortal">认领门户</span>
          </el-tooltip>
        </span>
      </div>
      <div class="articles">
        <div class="articles-info">
          <span>共 {{ info.papers.length }} 条</span>
        </div>
        <div>
          <div class="article-block" v-for="(article, index) in info.papers" :key="index">
            <div @click="toArticle(article.paper_id)">
              <el-row>
                <el-col :span="1" style="text-align: left; font-size: 15px">{{ index+1 }}&nbsp;&nbsp;&nbsp;</el-col>
                <el-col :span="23">
                  <div class="title">
                    <span>{{ article.paper_title }}</span>
                  </div>
                  <div class="author _info">
                    <span>
                      <span v-for="(aut, i) in article.authors">
                        {{ aut.real_name }}
                        <span v-if="i<article.authors.length-1"> / </span>
                      </span>
                      &nbsp;·&nbsp;{{ article.publisher }}&nbsp;·&nbsp;{{ article.year }}
                    </span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      submit_id: 'submit_id',

      info: {
        author_id: '12',
        real_name: 'Zehuan Huang',
        work_email: 'huangzehuan@buaa.edu.cn',
        affiliation_name: 'Beihang University',
        fields: ['Computer Vision', 'Computer Graphics'],
        homepage: 'https://blog.zewan.cc/',
        papers: [
          {
            paper_id: '12312342',
            paper_title: 'Aesthetic image enhancement by dependence-aware object recomposition',
            authors: [
              {
                affiliation_id: "",
                affiliation_name: "Independent Researcher",
                author_id: "3192512793",
                real_name: "Sergei Belousov",
                order: "1"
              },
              {
                affiliation_id: "",
                affiliation_name: "Independent Researcher",
                author_id: "3192512793",
                real_name: "Sergei Belousov",
                order: "1"
              }
            ],
            publisher: 'Elsevier BV',
            year: '2021'
          },
          {
            paper_id: '12312342',
            paper_title: 'PatchNet: a patch-based image representation for interactive library-driven image editing',
            authors: [
              {
                affiliation_id: "",
                affiliation_name: "Independent Researcher",
                author_id: "3192512793",
                real_name: "Sergei Belousov",
                order: "1"
              },
              {
                affiliation_id: "",
                affiliation_name: "Independent Researcher",
                author_id: "3192512793",
                real_name: "Sergei Belousov",
                order: "1"
              }
            ],
            publisher: 'Elsevier BV',
            year: '2021'
          },
          {
            paper_id: '12312342',
            paper_title: 'Example-guided style-consistent image synthesis from semantic labeling',
            authors: [
              {
                affiliation_id: "",
                affiliation_name: "Independent Researcher",
                author_id: "3192512793",
                real_name: "Sergei Belousov",
                order: "1"
              },
              {
                affiliation_id: "",
                affiliation_name: "Independent Researcher",
                author_id: "3192512793",
                real_name: "Sergei Belousov",
                order: "1"
              }
            ],
            publisher: 'Elsevier BV',
            year: '2021'
          },
        ]
      }
    }
  },
  methods: {
    toArticle: function(index) {
      window.open(this.GLOBAL.searchUrl + "/article?v=" + index);
    },
    goSchPortal() {
      window.open(this.GLOBAL.searchUrl + '/schPortal?v=' + this.info.author_id);
    }
  },
  created() {
    this.submit_id = this.$route.query.v;
  }
}
</script>

<style scoped>

.detail ._info {
  color: #909eb4;
}

.detail .apply-body {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04);
  background-color: white;
  width: 900px;
  min-height: 550px;
  margin: 40px auto;
  padding: 30px 50px;
}

.detail .block-title {
  font-size: 23px;
  font-weight: bold;
  margin-bottom: 40px;
}

.detail .link-sch {
  cursor: pointer;
}

.detail .link-sch:hover {
  color: #1687fd;
  text-decoration: underline #1687fd;
}

.detail .left {
  text-align: left;
}

.detail .info-table {
  margin-bottom: 50px;
}

.detail .articles {
  text-align: left;
}

.detail .articles-info {
  margin-bottom: 12px;
  color: #909eb4;
  font-size: 13px;
}

.detail .article-block {
  padding-top: 10px;
}

.detail .article-block:hover {
  background: #f4f9ff;
  cursor: pointer;
}

.detail .title {
  font-size: 15px;
}

.detail .reference-article-block:hover .title {
  color: #1f71df;
}

.detail .author {
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 14px;
}

</style>