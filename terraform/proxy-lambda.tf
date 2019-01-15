data "archive_file" "proxy" {
  type = "zip"
  output_path = "${path.module}/.zip/proxy.zip"
  source {
    filename = "index.js"
    content = "${file("${path.module}/../cloud/proxy.js")}"
  }
}

resource "aws_lambda_function" "proxy" {
  function_name = "${var.app_name}-proxy"
  filename = "${data.archive_file.proxy.output_path}"
  source_code_hash = "${data.archive_file.proxy.output_base64sha256}"
  role = "${aws_iam_role.main.arn}"
  runtime = "nodejs6.10"
  handler = "index.handler"
  memory_size = 128
  timeout = 3
  publish = true
}

data "aws_iam_policy_document" "lambda" {
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

resource "aws_iam_role" "main" {
  name_prefix = "${var.app_name}"
  assume_role_policy = "${data.aws_iam_policy_document.lambda.json}"
}
