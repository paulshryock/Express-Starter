---
title: 'Articles'
slug: articles
description: Check out our articles.
date: 2019-01-02T00:00:00-5
---
{%- if collections.articles %}
<ul class="articles">
  {%- for post in collections.articles %}
  <li class="article">
    <a href="/articles/{{ post.slug }}">{{ post.title }}</a>
  </li><!-- .article -->
  {%- endfor %}
</ul><!-- .articles -->
{%- endif %}