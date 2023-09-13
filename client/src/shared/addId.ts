export function addId (route: string, id: string | undefined) {
    return id ? `${route}/${id}` : route
}