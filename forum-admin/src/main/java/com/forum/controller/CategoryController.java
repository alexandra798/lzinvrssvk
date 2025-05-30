package com.forum.controller;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public Result<List<Category>> getCategories() {
        try {
            categoryService.getCategories();
            return Result.success();
        } catch (BusinessException e) {
            return Result.error(e.getMessage(), );
        }
    }
    @PostMapping
    public Result<?> createCategory(@RequestBody CategoryDTO categoryDTO) {
        try {
            categoryService.createCategory(categoryDTO);
            return Result.success();
        } catch (BusinessException e) {
            return Result.error(e.getMessage(), );
        }
    }

    @DeleteMapping
    public Result<?> deleteCategory(Long categoryId) {
        try {
            categoryService.deleteCategory(categoryId);
            return Result.success();
        } catch (BusinessException e) {
            return Result.error(e.getMessage(), );
        }
    }

    @PutMapping
    public Result<?> updateCategory(Long categoryId, CategoryDTO categoryDTO) {
        try {
            categoryService.updateCategory(categoryId, categoryDTO);
            return Result.success();
        } catch (BusinessException e) {
            return Result.error(e.getMessage(), );
        }
    }
}

