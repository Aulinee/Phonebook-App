from django.core.paginator import Paginator
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import PhoneBook
from .serializer import PhoneBookSerializer


@api_view(['GET'])
def get_phonebooks(request):
    # Get the page number, items per page, and search query from request parameters
    page_number = int(request.GET.get('page', 1))  # Default to page 1
    items_per_page = int(request.GET.get('limit', 10))  # Default to 10 items per page
    search_query = request.GET.get('search', '')  # Default to an empty string

    # Filter the phonebooks based on the search query
    if search_query:
        phonebooks = PhoneBook.objects.filter(phoneName__icontains=search_query)
    else:
        phonebooks = PhoneBook.objects.all()

    # Paginate the filtered phonebooks
    paginator = Paginator(phonebooks, items_per_page)
    page_obj = paginator.get_page(page_number)
    
    # Serialize the data
    serialized_data = PhoneBookSerializer(page_obj.object_list, many=True).data
    
    # Prepare the response
    response = {
        'items': serialized_data,
        'totalItems': paginator.count,
        'totalPages': paginator.num_pages,
        'currentPage': page_number,
        'itemsPerPage': items_per_page,
    }
    
    return Response(response)

@api_view(['POST'])
def create_phonebooks(request):
    data = request.data
    serializer = PhoneBookSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def phonebook_detail(request, pk):
    try:
        book = PhoneBook.objects.get(pk=pk)
    except PhoneBook.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        data = request.data
        serializer = PhoneBookSerializer(book, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)