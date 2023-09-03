<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Traits\UploadFile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ItemController extends Controller
{
    use UploadFile;
    public function index(Request $request): JsonResponse
    {
        $items = Item::where('shop_id', Auth::user()->shop_id)->when($request->input('search') !== "", function ($query) use ($request) {
            $query->where('name', 'LIKE', '%' . $request->input('search') . '%');
        })->paginate(12);
        return $this->responseSuccess('Items found', $items);
    }

    public function create(Request $request): JsonResponse
    {
        $validated = $this->validate($request, [
            'name' => 'required',
            'price' => 'required|numeric',
            'discount' => 'nullable|numeric',
            'detail' => 'required',
            'photo' => 'required|image|max:2048'
        ], [], [
            'name' => 'Nama Barang',
            'price' => 'Harga Barang',
            'discount' => 'Diskon Barang',
            'detail' => 'Detail Barang',
            'photo' => 'Foto Barang'
        ]);

        $path = $this->upload("images/product-photo", $validated['photo']);
        Item::create([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'discount' => $validated['discount'],
            'detail' => $validated['detail'],
            'photo' => $path,
            'shop_id' => Auth::user()->shop_id
        ]);
        return $this->responseSuccess('Item created successfully');
    }

    public function show(Item $item): JsonResponse
    {
        return $this->responseSuccess('Item found', $item);
    }

    public function update(Item $item, Request $request): JsonResponse
    {
        $validated = $this->validate($request, [
            'name' => 'required',
            'price' => 'required|numeric',
            'discount' => 'nullable|numeric',
            'detail' => 'required',
            'photo' => 'nullable|image|max:2048'
        ], [], [
            'name' => 'Nama Barang',
            'price' => 'Harga Barang',
            'discount' => 'Diskon Barang',
            'detail' => 'Detail Barang',
            'photo' => 'Foto Barang'
        ]);

        $path = $item->photo;
        if (isset($validated['photo'])) {
            if (Storage::exists($path)) {
                Storage::delete($path);
            }
            $path = $this->upload("images/product-photo", $validated['photo']);
        }

        $item->update([
            'price' => $validated['price'],
            'discount' => isset($validated['discount']) ? $validated['discount'] : $item->discount,
            'detail' => $validated['detail'],
            'photo' => $path,
            'shop_id' => Auth::user()->shop_id
        ]);
        return $this->responseSuccess('Item updated successfully');
    }

    public function delete(Item $item): JsonResponse
    {
        if (isset($item->photo)) {
            if (Storage::exists($item->photo)) {
                Storage::delete($item->photo);
            }
        }
        $item->delete();

        return $this->responseSuccess('Item deleted successfully');
    }
}
