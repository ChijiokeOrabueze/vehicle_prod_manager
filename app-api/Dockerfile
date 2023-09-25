FROM ruby:3.1.4

RUN mkdir /api

RUN groupadd -g 999 appuser && \
    useradd -r -u 999 -g appuser appuser

RUN chown appuser /api

USER appuser

WORKDIR /api

RUN apt-get update -qq \
&& apt-get install -y nodejs postgresql-client

COPY Gemfile Gemfile.lock ./

RUN bundle i

COPY . .

EXPOSE 8000

CMD ["bash"]