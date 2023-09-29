/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.3.1.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as bmShelf_bookmark from "../bmShelf/bookmark";
import type * as bmShelf_folder from "../bmShelf/folder";
import type * as constants from "../constants";
import type * as openAi from "../openAi";
import type * as types from "../types";
import type * as utils from "../utils";
import type * as webContent from "../webContent";
import type * as webContentUtils from "../webContentUtils";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "bmShelf/bookmark": typeof bmShelf_bookmark;
  "bmShelf/folder": typeof bmShelf_folder;
  constants: typeof constants;
  openAi: typeof openAi;
  types: typeof types;
  utils: typeof utils;
  webContent: typeof webContent;
  webContentUtils: typeof webContentUtils;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
