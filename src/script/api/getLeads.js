const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU1MDZmZjMwZDJiMWM3NTg5YmEyZDZmZWNlYjczODFiYWRjY2JjYzBjZmM2NWFhODM3OTYwYzcyMjhhNTg5ZTliNTc0ZTc0YjA4NmNkN2U1In0.eyJhdWQiOiIxMzM1MTZkZC1iMTg0LTQ4ZWItOTBlNi1hNzZlNmRjNDA4MDUiLCJqdGkiOiJlNTA2ZmYzMGQyYjFjNzU4OWJhMmQ2ZmVjZWI3MzgxYmFkY2NiY2MwY2ZjNjVhYTgzNzk2MGM3MjI4YTU4OWU5YjU3NGU3NGIwODZjZDdlNSIsImlhdCI6MTcwODQzMTAzMywibmJmIjoxNzA4NDMxMDMzLCJleHAiOjE3MjI0NzA0MDAsInN1YiI6IjEwNjY0NzU4IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNTY0NjU4LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiZGEzYzVkODctYzI1YS00MTRiLWExOWEtNTZhMTQxYWFlMjAyIn0.A0mDkET1yE9bJwCiuUTozp9f1aGwULot74rBfIyFmxzd00XhbnRiCopbU05MoN0LkPQav4JIC4HOwcH_xpg0GWcG19EsnwHgiI-jKy_YmaUP1kKAEQOf8DCXOApX3JythIAMphSElYxKaKoCxriXdEleIVm1DNOl_jvZJt6d2kmDc8KRn00cuu1lyMFWaRGRCtOhkRxd11kLcAbsEqhOIcx5ZcF11ydb0SEUXLeVcPtAptg7opE_GwiLE0usNrPtckN0qYhSuCTRypNBvagvuNm30F9sSZxTuqLlgbs_eqfJrR4GPg_WNDG6be4LqAxuOsX62KW5FIB5vdft9l6uGQ";

const proxy = "https://thingproxy.freeboard.io/fetch/";

const url = "https://klokovevgen.amocrm.ru";

export async function getLeadsList(page, limit) {
  const queryString = arguments.length
    ? `?${page && `page=${page}`}&${limit && `limit=${limit}`}`
    : "";
  try {
    const response = await fetch(`${proxy}${url}/api/v4/leads${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
