import csv


# CSVファイルから指定された列を抽出する関数
def csv_to_js_array(file_path, column_indices):
    js_array = []

    # CSVファイルを開いて読み込む
    with open(file_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)

        # 各行から指定された列を抽出
        for row in reader:
            extracted_row = [row[i] for i in column_indices if len(row) > i]
            if extracted_row:  # 抽出した行にデータがある場合のみ追加
                js_array.append(extracted_row)

    return js_array

# JavaScriptの配列形式に変換する関数
def format_js_array(js_array):
    # 値をクォートしてJavaScriptの配列形式にフォーマット
    js_array_formatted = ',\n '.join([f'{value}' for value in js_array])
    return f'[{js_array_formatted}]'


# メインの処理
if __name__ == "__main__":
    
    
    
    
    # ファイルパスと抽出したい列番号を指定
    file_path = "data\price_compare\partworkquiz_price_compare_div2.csv"

    column_indices = [0,1,2,3,4,5]
    
    
    


    # CSVから指定された列を抽出
    js_array = csv_to_js_array(file_path, column_indices)

    # JavaScriptの配列形式に変換
    js_array_formatted = format_js_array(js_array)

    # 結果を表示
    print("JavaScript形式の配列:")
    print(js_array_formatted)
