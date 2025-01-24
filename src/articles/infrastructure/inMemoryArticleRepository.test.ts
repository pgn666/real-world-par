import { articleRepositoryContract } from "./articleRepositoryContract.test";
import { inMemoryArticleRepository } from "./inMemoryArticleRepository";

articleRepositoryContract("in-memory", inMemoryArticleRepository());

// OCP - open closed principles
// open for extension, closed for modification