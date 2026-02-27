import { IResources } from "../store/useResourcesStore";

export default function fetchSources(dataSources: string[], resources: IResources) {
    const res: { doc: any; type: string; }[] = [];

    for (const [key, resources_arr] of Object.entries(resources)) {
        for (const doc of resources_arr) {
            if (dataSources.includes(doc.id)) {
                res.push({ 'doc': doc, 'type': key });
            }
        }
    }

    return res;
}