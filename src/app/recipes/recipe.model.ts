import { Ingredient } from '../shared/ingredients.model';

export class Recipe {
  filter(arg0: (item: any) => boolean) {
    throw new Error("Method not implemented.");
  }
  concat(recipes: any) {
    throw new Error("Method not implemented.");
  }
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(

    name: string,
    desc: string,
    imagePath: string,
    ingredients: Ingredient[]
  ) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
