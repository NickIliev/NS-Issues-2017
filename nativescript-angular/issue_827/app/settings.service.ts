import { Injectable } from "@angular/core";
import * as applicationSettings from "application-settings";

@Injectable()
export class SettingsService {
    /**
    * Checks whether such a key exists.
    * @param key The key to check for.
    */
    hasKey(key: string): boolean {
        return applicationSettings.hasKey(key);
    }

    /**
    * Gets a value (if existing) for a key as a Boolean Object. A default value can be provided in case there is no existing value.
    * @param key The key to check for.
    * @param defaultValue An optional value to be returned in case there is no existing value.
    */
    getBoolean(key: string, defaultValue?: boolean): boolean {
        return applicationSettings.getBoolean(key, defaultValue);
    }

    /**
    * Gets a value (if existing) for a key as a String Object. A default value can be provided in case there is no existing value.
    * @param key The key to check for.
    * @param defaultValue An optional value to be returned in case there is no existing value.
    */
    getString(key: string, defaultValue?: string): string {
        return applicationSettings.getString(key, defaultValue);
    }

    /**
    * Gets a value (if existing) for a key as a Number Object. A default value can be provided in case there is no existing value.
    * @param key The key to check for.
    * @param defaultValue An optional value to be returned in case there is no existing value.
    */
    getNumber(key: string, defaultValue?: number): number {
        return applicationSettings.getNumber(key, defaultValue);
    }

    /**
    * Sets a Boolean Object for a key.
    * @param key The key.
    * @param value The value.
    */
    setBoolean(key: string, value: boolean): void {
        applicationSettings.setBoolean(key, value);
    }

    /**
    * Sets a String Object for a key.
    * @param key The key.
    * @param value The value.
    */
    setString(key: string, value: string): void {
        applicationSettings.setString(key, value);
    }

    /**
    * Sets a Number Object for a key.
    * @param key The key.
    * @param value The value.
    */
    setNumber(key: string, value: number): void {
        applicationSettings.setNumber(key, value);
    }

    /**
    * Removes a value (if existing) for a key.
    * @param key The key to check for.
    */
    remove(key: string): void {
        applicationSettings.remove(key);
    }

    clear(): void {
        applicationSettings.clear();
    }

}
