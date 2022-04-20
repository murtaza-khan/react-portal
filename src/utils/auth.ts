export const checkLoginApiData = (apiData: any) => {
  if (!apiData.username || !apiData.username.trim()) {
    return { ok: false, error: 'Email required' };
  }

  if (!apiData.password) {
    return { ok: false, error: 'Password required' };
  }

  return { ok: true };
}