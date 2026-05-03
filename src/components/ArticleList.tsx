import type { Post } from "@/lib/posts";
import Article from "@/components/Article";
import { StaggerContainer, StaggerItem } from "@/components/shared/Motion";

export interface ArticleListProps {
  articles: Post[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  return (
    <StaggerContainer className="flex flex-col gap-6">
      {articles.map((article) => (
        <StaggerItem key={article.slug}>
          <Article article={article} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
