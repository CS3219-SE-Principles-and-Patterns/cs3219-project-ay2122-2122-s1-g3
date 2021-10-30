const questions = {
  easy: [
    {
      title: "Two Sum",
      body: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    },
    {
      title: "Best Time to Buy and Sell Stock",
      body: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
    },
    {
      title: "Contains Duplicate",
      body: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    },
    {
      title: "Maximum Subarray",
      body: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum. A subarray is a contiguous part of an array.",
    },
    {
      title: "Counting Bits",
      body: "Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).",
    },
    {
      title: "Number of 1 Bits",
      body: "Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.",
    },
    {
      title: "Missing Number",
      body: "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
    },
    {
      title: "Reverse Bits",
      body: "Reverse bits of a given 32 bits unsigned integer.",
    },
    {
      title: "Climbing Stairs",
      body: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    },
    {
      title: "Meeting Rooms",
      body: "Given an array of meeting time intervals where intervals[i] = [starti, endi], determine if a person could attend all meetings.",
    },
    {
      title: "Meeting Rooms II",
      body: "Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.",
    },
    {
      title: "Reverse Linked List",
      body: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    },
    {
      title: "Linked List Cycle",
      body: "Given head, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter. Return true if there is a cycle in the linked list. Otherwise, return false.",
    },
    {
      title: "Merge Two Sorted Lists",
      body: "Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.",
    },
    {
      title: "Valid Anagram",
      body: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    },
    {
      title: "Valid Parentheses",
      body: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    },
    {
      title: "Valid Palindrome",
      body: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
    },
    {
      title: "Maximum Depth of Binary Tree",
      body: "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    },
    {
      title: "Same Tree",
      body: "Given the roots of two binary trees p and q, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.",
    },
    {
      title: "Invert Binary Tree",
      body: "Given the root of a binary tree, invert the tree, and return its root.",
    },
    {
      title: "Subtree of Another Tree",
      body: "Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise. A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.",
    },
    {
      title: "Lowest Common Ancestor of a Binary Search Tree",
      body: "Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.",
    },
    {
      title: "Implement Trie (Prefix Tree)",
      body: "A trie (pronounced as 'try') or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.",
    },
    {
      title: "Design Add and Search Words Data Structure",
      body: "Design a data structure that supports adding new words and finding if a string matches any previously added string.",
    },
  ],
  medium: [
    {
      title: "Product of Array Except Self",
      body: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation.",
    },
    {
      title: "Maximum Product Subarray",
      body: "Given an integer array nums, find a contiguous non-empty subarray within the array that has the largest product, and return the product. It is guaranteed that the answer will fit in a 32-bit integer. A subarray is a contiguous subsequence of the array.",
    },
    {
      title: "Search in Rotated Sorted Array",
      body: "There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2]. Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums. You must write an algorithm with O(log n) runtime complexity.",
    },
    {
      title: "3Sum",
      body: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.",
    },
    {
      title: "Container With Most Water",
      body: "Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the container contains the most water. Notice that you may not slant the container.",
    },
    {
      title: "Sum of Two Integers",
      body: "Given two integers a and b, return the sum of the two integers without using the operators + and -.",
    },
    {
      title: "Coin Change",
      body: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1. You may assume that you have an infinite number of each kind of coin.",
    },
    {
      title: "Longest Increasing Subsequence",
      body: "Given an integer array nums, return the length of the longest strictly increasing subsequence. A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements. For example, [3,6,2,7] is a subsequence of the array [0,3,1,6,2,2,7].",
    },
    {
      title: "Longest Common Subsequence",
      body: "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0. A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters. A common subsequence of two strings is a subsequence that is common to both strings.",
    },
    {
      title: "Word Break",
      body: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words. Note that the same word in the dictionary may be reused multiple times in the segmentation.",
    },
    {
      title: "Combination Sum IV",
      body: "Given an array of distinct integers nums and a target integer target, return the number of possible combinations that add up to target. The answer is guaranteed to fit in a 32-bit integer.",
    },
    {
      title: "House Robber",
      body: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
    },
    {
      title: "House Robber II",
      body: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night. Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
    },
    {
      title: "Unique Paths",
      body: "A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below). The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below). How many possible unique paths are there?",
    },
    {
      title: "Jump Game",
      body: "You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise.",
    },
    {
      title: "Clone Graph",
      body: "Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph. Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.",
    },
    {
      title: "Course Schedule",
      body: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1. Return true if you can finish all courses. Otherwise, return false.",
    },
    {
      title: "Number of Islands",
      body: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
    },
    {
      title: "Longest Consecutive Sequence",
      body: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",
    },
    {
      title: "Graph Valid Tree",
      body: "You have a graph of n nodes labeled from 0 to n - 1. You are given an integer n and a list of edges where edges[i] = [ai, bi] indicates that there is an undirected edge between nodes ai and bi in the graph. Return true if the edges of the given graph make up a valid tree, and false otherwise.",
    },
    {
      title: "Number of Connected Components in an Undirected Graph",
      body: "You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph. Return the number of connected components in the graph.",
    },
    {
      title: "Insert Interval",
      body: "You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval. Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary). Return intervals after the insertion.",
    },
    {
      title: "Merge Interval",
      body: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    },
    {
      title: "Non-overlapping Intervals",
      body: "Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.",
    },
    {
      title: "Remove Nth Node From End of List",
      body: "Given the head of a linked list, remove the nth node from the end of the list and return its head.",
    },
    {
      title: "Set Matrix Zeroes",
      body: "Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's, and return the matrix. You must do it in place.",
    },
    {
      title: "Spiral Matrix",
      body: "Given an m x n matrix, return all elements of the matrix in spiral order.",
    },
    {
      title: "Rotate Image",
      body: "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.",
    },
    {
      title: "Word Search",
      body: "Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.",
    },
    {
      title: "Longest Substring Without Repeating Characters",
      body: "Given a string s, find the length of the longest substring without repeating characters.",
    },
    {
      title: "Longest Repeating Character Replacement",
      body: "You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times. Return the length of the longest substring containing the same letter you can get after performing the above operations.",
    },
    {
      title: "Group Anagrams",
      body: "Given an array of strings strs, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    },
    {
      title: "Longest Palindromic Substring",
      body: "Given a string s, return the longest palindromic substring in s.",
    },
    {
      title: "Palindromic Substrings",
      body: "Given a string s, return the number of palindromic substrings in it. A string is a palindrome when it reads the same backward as forward. A substring is a contiguous sequence of characters within the string.",
    },
    {
      title: "Encode and Decode Strings",
      body: "Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.",
    },
    {
      title: "Binary Tree Level Order Traversal",
      body: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
    },
    {
      title: "Construct Binary Tree from Preorder and Inorder Traversal",
      body: "Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.",
    },
    {
      title: "Validate Binary Search Tree",
      body: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
    },
    {
      title: "Kth Smallest Element in a BST",
      body: "Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.",
    },
    {
      title: "Top K Frequent Elements",
      body: "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
    },
  ],
  hard: [
    {
      title: "Alien Dictionary",
      body: "There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you. You are given a list of strings words from the alien language's dictionary, where the strings in words are sorted lexicographically by the rules of this new language. Return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules. If there is no solution, return \"\". If there are multiple solutions, return any of them.",
    },
    {
      title: "Merge k Sorted Lists",
      body: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    },
    {
      title: "Minimum Window Substring",
      body: "Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string \"\". The testcases will be generated such that the answer is unique. A substring is a contiguous sequence of characters within the string.",
    },
    {
      title: "Binary Tree Maximum Path Sum",
      body: "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root. The path sum of a path is the sum of the node's values in the path. Given the root of a binary tree, return the maximum path sum of any path.",
    },
    {
      title: "Serialize and Deserialize Binary Tree",
      body: "Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.",
    },
    {
      title: "Word Search II",
      body: "Given an m x n board of characters and a list of strings words, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.",
    },
    {
      title: "Find Median from Data Stream",
      body: "The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value and the median is the mean of the two middle values. Implement the MedianFinder class with addnum(int num) and findMedian() methods",
    },
  ],
};

export default questions;
