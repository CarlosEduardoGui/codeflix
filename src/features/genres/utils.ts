import { Genre } from "../../types/Genre"

export const mapGenreToForm = (genre: Genre) => {
    return {
        id: genre.id,
        name: genre.name,
        categories_ids: genre.categories?.map((category) => category.id),
    }
}