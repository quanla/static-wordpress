Chào năm mới tới tất cả các bạn.

Như đã hứa, mình xin phép trình bầy tiếp về FP và IoC, DP, để giúp các bạn nhìn thấy những lợi ích to lớn của FP khi áp dụng đúng cách vào lập trình.

IoC.

Chắc hẳn các bạn đã từng gặp phải vấn đề trong việc tổ chức các thư viện, các lớp dùng chung trong project của mình. Vấn đề ở đây là gì? 1 project cần phải có code dùng chung, đó là nguyên tắc cơ bản, nhưng các lớp dùng chung cũng lại cần dùng lẫn nhau ( lệ thuộc, depend lẫn nhau) mà như vậy thì không tốt tí nào, compiler sẽ báo lỗi, còn JS module thì sẽ bị null. Tất cả code trong hệ thống phải lệ thuộc lẫn nhau theo hình cây, phía trên gọi phía dưới và ko đc phép ngược lại. Đây là vấn đề rất lớn, và nếu không giải quyết được, các bạn sẽ thấy lượng code dùng chung trong hệ thống rất ít so với code business => not healthy code base.

Vậy IoC giải quyết vấn đề này như thế nào? IoC là đảo ngược điều khiển, tức là khi A gọi đến B, nhưng khi B thực hiện mà cần gọi đến A, thì dùng IoC và A sẽ được triệu hồi mà B vẫn không phải gọi đích xác A ra => ko bị lệ thuộc vào A => giải quyết được vấn đề. Nghe khù khoằm quá, cụ thể là thế này.

Có 1 đoạn code A, đang cần tìm những file nào có tên là "package.json" và 1 đoạn code B chuyên duyệt cây thư mục. Ta có thể nghĩ đến code của B sẽ có hàm sau:
collect(fileName), và A sẽ gọi đến như sau:
‎let files = B.collect("package.json");
‎vậy là xong phải ko, B gọn gàng và chẳng liên quan gì đến A cả? Sai. Nếu chỉ có tìm đúng file theo tên rồi gom vào mảng thì như thế này là đủ, nhưng yêu cầu thực tế phức tạp hơn nhiều. Nếu muốn tìm những file nào có đuôi là .js thì sao? Những file nào có kích cỡ hơn 1M thì sao?... chẳng nhẽ với mỗi yêu cầu như vậy sẽ phải viết thêm 1 hàm? Và nếu chỉ muốn tìm thấy 1 file đầu tiên rồi dừng thì sao? Câu trả lời là đây:
B.collect(file => file.fileName == "package.json")

Đoạn function file.fileName == "package.json" vẫn nằm trên code của A, nhưng sẽ được B thực thì mỗi khi B gặp 1 file, vậy là B ko phụ thuộc vào A, mà vẫn có thể linh động phục vụ mọi loại bài toán mà A có thể gặp phải.

Đó là IoC và FP, chỉ đơn giản vậy thôi mà hiệu quả không ngờ, và nếu code của các bạn đang có nhiều đoạn bị lặp mà không biết tách ra bằng cách nào, hay thử cách này xem.

Dạo này mình hơi bận nên viết ngắn thế thôi, có gì comment tiếp vậy. Chúc các bạn năm mới mạnh khỏe và thành công