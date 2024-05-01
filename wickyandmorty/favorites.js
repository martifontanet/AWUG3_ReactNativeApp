import { makeAutoObservable } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage"

class Favorites {
    constructor() {
        this._favorites = new Set();
        makeAutoObservable(this)
    }

    async saveFavoritesToStorage() {
        console.log('guardant favorits a Storage');
        try {
            await AsyncStorage.setItem("favorites", JSON.stringify(this._favorites));
        } catch (e) {
            console.log(e.message);
        }
    }

    async loadFavoritesFromStorage() {
        console.log('carregant favorits de Storage');
        const favoritesData = await AsyncStorage.getItem("favorites");
        if (favoritesData) {
            const favorites = JSON.parse(favoritesData);
            favorites.forEach(element => {
                this._favorites.add(element);
            });
        }
    }

    toggle(id) {
        if (this._favorites.has(id)) {
            this._favorites.delete(id);
        } else {
            this._favorites.add(id);
        }
        this.saveFavoritesToStorage();
    }

    isFavorite(id) {
        console.log('is favorite: ', this._favorites.has(id))
        return this._favorites.has(id);
    }

    get itemsNum() {
        return this._favorites.size;
    }

    get favoriteList() {
        //return Array.from(this._favorites);
        console.log('favoriteList: ', [...this._favorites])
        return [...this._favorites];
    }
}

export const favorites = new Favorites();