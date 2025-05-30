package com.forum.controller;

@RestController
public class PostController {

    @Autowired
    private PostService postService;

    //创建帖子，这是在Home页面点击创建帖子按钮后执行的操作，具体来说是系统先弹出标题输入栏和正文输入栏，我输入内容后再作为表单submit，接着这些数据，包括系统自动抓取的用户id和自动生成的postid，以json形式传进controller中，controller将这些东西变为DTO类下的一个实例


    @PostMapping("/api/posts")
    public Result<PostItemVO> createPost(@RequestBody PostDTO postDTO) {
        try {
            PostItemVO post = postService.createPost(postDTO);
            return Result.success(post);
        } catch (BusinessException e) {
            return Result.error(e.getMessage(), );
        }
    }

    //顾名思义，点进一个post后获取到PostDetailVO作为Result，显示post的detail页面，其中包括标题正文和已存在的相关联的评论们
    @GetMapping("/api/posts/{id}")
    public Result<PostDetailVO> getPostDetail(@PathVariable Long id) {
        try {
            PostDetailVO post = postService.getPostDetail(id);
            return Result.success(post);
        } catch (BusinessException e) {
            return Result.error(e.getMessage(), );
        }
    }


    @GetMapping("/api/home/{categoryId}")
    public Result<PageResult<PostItemVO>> getPostsByCategory(
            @PathVariable(required = false) Long categoryId,
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "20") Integer pageSize) {
        try {
            PostQueryDTO postQueryDTO = new PostQueryDTO();
            postQueryDTO.setCategory(String.valueOf(categoryId));
            postQueryDTO.setPageNo(pageNum);
            postQueryDTO.setPageSize(pageSize);

            PageResult<PostListVO> posts = postService.getPostsByCategory(categoryId, postQueryDTO);
            return Result.success(posts);
        } catch (BusinessException e) {
            return Result.error(e.getMessage(), );
        }
    }

    @GetMapping("/api/home")
    public Result<PageResult<PostItemVO>> getPosts(
            @RequestParam(defaultValue = "General") Long categoryId,
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "20") Integer pageSize) {
        try {
            PostQueryDTO postQueryDTO = new PostQueryDTO();
            postQueryDTO.setCategory(String.valueOf(categoryId));
            postQueryDTO.setPageNo(pageNum);
            postQueryDTO.setPageSize(pageSize);

            PageResult<PostListVO> posts = postService.getPostsByCategory(categoryId, postQueryDTO);
            return Result.success(posts);
        } catch (BusinessException e) {
            return Result.error(e.getMessage(), );
        }
    }

    //report操作，对应的是用户在一条帖post的详情页的正文的右下角点击report按钮（等我学会ui后会将其换成旗子）
    @PostMapping("/api/posts/{id}/report")
    public Result<?> reportPost(@PathVariable Long PostId) {
        try {
            postService.reportPost(PostId);
            return Result.success();
        } catch (BusinessException e) {
            return Result.error(e.getMessage(), );
        }
    }

    @PutMapping("/api/posts/{postId}/update")
    public Result<?> updatePost(@PathVariable Long PostId, @RequestBody PostDTO postDTO) {
        try {
            postService.updatePost(PostId, postDTO);
            return Result.success();
        } catch (BusinessException e) {
            return Result.error(e.getMessage(),);
        }
    }

    //post被举报五次后触发自动collapse，但那个操作不应该写在controller里



}