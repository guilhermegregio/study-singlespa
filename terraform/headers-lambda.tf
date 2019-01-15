data "archive_file" "headers" {
  type = "zip"
  output_path = "${path.module}/.zip/headers.zip"
  source {
    filename = "index.js"
    content = "${file("${path.module}/../cloud/headers.js")}"
  }
}

resource "aws_lambda_function" "headers" {
  function_name = "${var.app_name}-headers"
  filename = "${data.archive_file.headers.output_path}"
  source_code_hash = "${data.archive_file.headers.output_base64sha256}"
  role = "${aws_iam_role.headers.arn}"
  runtime = "nodejs8.10"
  handler = "index.handler"
  memory_size = 128
  timeout = 3
  publish = true
}

data "aws_iam_policy_document" "headers" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type = "Service"
      identifiers = [
        "lambda.amazonaws.com",
        "edgelambda.amazonaws.com"
      ]
    }
  }
}

resource "aws_iam_role" "headers" {
  name_prefix = "${var.app_name}"
  assume_role_policy = "${data.aws_iam_policy_document.headers.json}"
}
