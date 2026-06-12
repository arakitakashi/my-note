// frontmatter の日付(YYYY-MM-DD)は UTC 深夜0時として解釈されるため、
// UTC 基準で整形することでビルド環境のタイムゾーンに左右されない。
export const formatDate = (value: Date) => value.toISOString().slice(0, 10);
