// @flow
import type {Options, Post, Category, Author} from './types';
import yaml from 'js-yaml';
import {urlize} from './urlize';

export function processPost(options: Options, post: Object) : Post {
  return {
    title: (post.post_title || '').replace(/\&amp;/g, '&'),
    slug: post.post_name,
    image: post.thumbnail || null,
    date: post.post_date,
    author: post.author.user_nicename,
    description: post.post_excerpt,
    categories: post.categories,
    body: post.post_content,
    fromDB: post
  };
}

export function processCategory(options: Options, category: Object) : Category {
  return {title: category.name, slug: urlize(category.name), description: category.description, fromDB: category};
}

const socialFields = ['twitter', 'facebook', 'googleplus'];
export function processAuthor(options: Options, author: Object) : Author {
  return {
    title: (author.display_name || '').replace(/\&amp;/g, '&'),
    slug: author.user_nicename,
    email: (author.user_email || '').toLowerCase(),
    first_name: author.first_name || null,
    last_name: author.last_name || null,
    description: author.description || '',
    www: author.user_url || author.url || null,
    social: socialFields.reduce((r, f) => author[f] ? Object.assign(r, {[f]: author[f]}) : r, {}),
    fromDB: author
  };
}
