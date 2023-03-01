

export interface ApiReturn {
    result: boolean,
    // 正常な場合の data
    data?: any,
    // エラーがあった場合 (配列にした方が拡張性ある)
    // 401の場合は この配列に {loginRequired : true} みたいなオブジェクトが入るイメージ
    error?: object,
    loginRequired?: boolean,
}