import type { DataProvider } from "react-admin";

const API = "http://localhost:4000/api";

function normalizeOrder(item: any) {
  return { ...item, price: item?.price == null ? item?.price : Number(item.price) };
}

async function http(url: string, init?: RequestInit) {
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || res.statusText);
  return json;
}

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination ?? { page: 1, perPage: 10 };
    const { field, order } = params.sort ?? { field: "createdAt", order: "DESC" };
    const q = new URLSearchParams({
      _start: String((page - 1) * perPage),
      _end: String(page * perPage),
      _sort: field,
      _order: order,
    });
    Object.entries(params.filter ?? {}).forEach(([k, v]) => {
      if (v !== undefined && v !== "") q.set(k, String(v));
    });
    const json = await http(`${API}/${resource}?${q}`);
    return { data: (json.data ?? []).map(normalizeOrder), total: json.total ?? 0 };
  },
  getOne: async (resource, params) => {
    const json = await http(`${API}/${resource}/${params.id}`);
    return { data: normalizeOrder(json.data) };
  },
  getMany: async (resource, params) => {
    const data = await Promise.all(
      params.ids.map((id) => http(`${API}/${resource}/${id}`).then((j) => normalizeOrder(j.data))),
    );
    return { data };
  },
  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const q = new URLSearchParams({
      _start: String((page - 1) * perPage),
      _end: String(page * perPage),
      _sort: field,
      _order: order,
      [params.target]: String(params.id),
    });
    Object.entries(params.filter ?? {}).forEach(([k, v]) => {
      if (v !== undefined && v !== "") q.set(k, String(v));
    });
    const json = await http(`${API}/${resource}?${q}`);
    return { data: (json.data ?? []).map(normalizeOrder), total: json.total ?? 0 };
  },
  create: async (resource, params) => {
    const json = await http(`${API}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    });
    return { data: normalizeOrder(json.data) };
  },
  update: async (resource, params) => {
    const json = await http(`${API}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    return { data: normalizeOrder(json.data) };
  },
  updateMany: async (resource, params) => {
    await Promise.all(
      params.ids.map((id) =>
        http(`${API}/${resource}/${id}`, { method: "PATCH", body: JSON.stringify(params.data) }),
      ),
    );
    return { data: params.ids };
  },
  delete: async (resource, params) => {
    const json = await http(`${API}/${resource}/${params.id}`, { method: "DELETE" });
    return { data: normalizeOrder(json.data ?? params.previousData) };
  },
  deleteMany: async (resource, params) => {
    await Promise.all(params.ids.map((id) => http(`${API}/${resource}/${id}`, { method: "DELETE" })));
    return { data: params.ids };
  },
};
